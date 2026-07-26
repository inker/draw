import delay from 'delay.js';

import WorkerManager from '#utils/WorkerManager';
import workerSendAndReceive from '#utils/worker/sendAndReceive';

const maxNumWorkers = navigator.hardwareConcurrency;

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
  new Promise<void>(resolve => {
    if (signal.aborted) {
      resolve();
      return;
    }
    signal.addEventListener(
      'abort',
      () => {
        resolve();
      },
      {
        once: true,
        signal: untilSettled,
      },
    );
  });

export default async <Func extends (...args: any) => void>({
  numWorkers: numWorkersParam,
  getWorker,
  getPayload,
  getTimeout,
  shouldSwallowErrors,
  signal,
}: {
  numWorkers: number | (() => number);
  getWorker: () => Worker;
  getPayload: (o: {
    workerIndex: number;
    attempt: number;
  }) => Parameters<Func>[0];
  getTimeout: (o: {
    workerIndex: number;
    numWorkers: number;
    attempt: number;
  }) => number;
  shouldSwallowErrors?: boolean;
  signal?: AbortSignal;
}): Promise<Awaited<ReturnType<Func>>> => {
  const workerManager = new WorkerManager({
    maker: getWorker,
  });
  let gotResult = false;

  if (signal) {
    signal.addEventListener(
      'abort',
      () => {
        gotResult = true;
        workerManager.killAll();
      },
      {
        once: true,
      },
    );
  }

  const promises = Array.from(
    {
      length: maxNumWorkers,
    },
    async (_, workerIndex) => {
      for (let attempt = 0; !gotResult; ++attempt) {
        const numWorkers =
          typeof numWorkersParam === 'function'
            ? numWorkersParam()
            : numWorkersParam;
        if (workerIndex >= numWorkers) {
          // eslint-disable-next-line no-await-in-loop
          await delay(1000);
        }
        const worker = workerManager.register();
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
            workerSendAndReceive<ReturnType<Func>>(worker)(
              getPayload({
                workerIndex,
                attempt,
              }),
            ),
            untilAborted({
              signal: attemptSignal,
              untilSettled: attemptSettled.signal,
            }),
          ]);
          if (raceResult !== undefined) {
            gotResult = true;
            workerManager.killAll();
            return {
              result: raceResult as Awaited<ReturnType<Func>>,
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
          workerManager.kill(worker);
        }
      }
    },
  );
  const firstResult = (await Promise.any(promises))!;
  return firstResult.result;
};
