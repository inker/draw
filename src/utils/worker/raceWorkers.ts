import delay from 'delay.js';

import WorkerManager from './WorkerManager';
import workerRpc from './rpc';

const maxNumWorkers = navigator.hardwareConcurrency;

// Unlike undefined, this can't be mistaken for anything a worker returns
const aborted = Symbol('aborted');

/**
 * Resolves once the signal aborts, so it can lose a race against the work.
 * An already-aborted signal never fires the event, hence the upfront check.
 * The listener is scoped to untilSettled:
 * a signal with a listener attached
 * stays reachable from the signals it was composed from,
 * so leaving it attached would pin one composite per attempt
 * onto the caller's long-lived signal.
 */
const untilAborted = ({
  signal,
  untilSettled,
}: {
  signal: AbortSignal;
  untilSettled: AbortSignal;
}) =>
  new Promise<typeof aborted>(resolve => {
    if (signal.aborted) {
      resolve(aborted);
      return;
    }
    signal.addEventListener(
      'abort',
      () => {
        resolve(aborted);
      },
      {
        once: true,
        signal: untilSettled,
      },
    );
  });

export default async <Func extends (...args: any) => unknown>({
  numWorkers: numWorkersParam,
  getWorker,
  getArgs,
  getTimeout,
  shouldSwallowErrors,
  signal,
}: {
  numWorkers: number | (() => number);
  getWorker: () => Worker;
  getArgs: (o: { workerIndex: number; attempt: number }) => Parameters<Func>;
  getTimeout: (o: {
    workerIndex: number;
    numWorkers: number;
    attempt: number;
  }) => number;
  shouldSwallowErrors?: boolean;
  signal?: AbortSignal;
}): Promise<Awaited<ReturnType<Func>>> => {
  // An aborted signal never fires the event below,
  // so the attempts would spin forever without yielding.
  signal?.throwIfAborted();

  const workerManager = new WorkerManager({
    maker: getWorker,
  });
  let gotResult = false;
  // detaches the abort listener once the race is over
  const raceSettled = new AbortController();

  if (signal) {
    signal.addEventListener(
      'abort',
      () => {
        gotResult = true;
        workerManager.killAll();
      },
      {
        once: true,
        signal: raceSettled.signal,
      },
    );
  }

  const getNumWorkers = () =>
    typeof numWorkersParam === 'function' ? numWorkersParam() : numWorkersParam;

  const promises = Array.from(
    {
      length: maxNumWorkers,
    },
    async (_, workerIndex) => {
      for (let attempt = 0; !gotResult; ++attempt) {
        let numWorkers = getNumWorkers();
        while (workerIndex >= numWorkers) {
          // eslint-disable-next-line no-await-in-loop
          await delay(1000);
          if (gotResult) {
            return undefined;
          }
          numWorkers = getNumWorkers();
        }
        const worker = workerManager.register();
        const rpc = workerRpc<Func>(worker);
        // The attempt is over once the deadline passes or the caller aborts,
        // so a cancelled draw no longer waits out the remaining timeout.
        const attemptSignal = AbortSignal.any(
          [
            signal,
            AbortSignal.timeout(
              getTimeout({
                workerIndex,
                numWorkers,
                attempt,
              }),
            ),
          ].filter(Boolean) as AbortSignal[],
        );
        // detaches the abort listener once the attempt is over
        const attemptSettled = new AbortController();
        try {
          // eslint-disable-next-line no-await-in-loop
          const raceResult = await Promise.race([
            rpc.call(
              ...getArgs({
                workerIndex,
                attempt,
              }),
            ),
            untilAborted({
              signal: attemptSignal,
              untilSettled: attemptSettled.signal,
            }),
          ]);
          if (raceResult !== aborted) {
            gotResult = true;
            workerManager.killAll();
            return {
              result: raceResult,
              workerIndex,
              attempt,
            };
          }
          // timed out or aborted
          workerManager.kill(worker);
        } catch (err) {
          if (shouldSwallowErrors) {
            console.error(err);
          } else {
            throw err;
          }
        } finally {
          attemptSettled.abort();
          rpc.close();
          workerManager.kill(worker);
        }
      }
    },
  );
  try {
    const firstResult = await Promise.any(promises);
    // Every attempt gives up without a winner only when the caller aborts
    if (!firstResult) {
      throw signal!.reason;
    }
    return firstResult.result;
  } finally {
    raceSettled.abort();
  }
};
