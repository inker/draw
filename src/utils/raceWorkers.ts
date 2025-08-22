import delay from 'delay.js';

import WorkerManager from '#utils/WorkerManager';
import workerSendAndReceive from '#utils/worker/sendAndReceive';

const maxNumWorkers = navigator.hardwareConcurrency;

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
        try {
          // eslint-disable-next-line no-await-in-loop
          const raceResult = await Promise.race([
            workerSendAndReceive<ReturnType<Func>>(worker)(
              getPayload({
                workerIndex,
                attempt,
              }),
            ),
            delay(
              getTimeout({
                workerIndex,
                numWorkers,
                attempt,
              }),
            ),
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
          // timed out
          workerManager.kill(worker);
        } catch (err) {
          if (shouldSwallowErrors) {
            console.error(err);
          } else {
            throw err;
          }
        } finally {
          workerManager.kill(worker);
        }
      }
    },
  );
  const firstResult = (await Promise.any(promises))!;
  return firstResult.result;
};
