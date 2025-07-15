import delay from 'delay.js';

import workerSendAndReceive from '#utils/worker/sendAndReceive';

const maxNumWorkers = navigator.hardwareConcurrency;

export default async <Func extends (...args: any) => void>({
  numWorkers: numWorkersParam,
  getWorker,
  getPayload,
  getTimeout,
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
  signal?: AbortSignal;
}): Promise<Awaited<ReturnType<Func>>> => {
  const workers: Worker[] = [];
  let gotResult = false;

  if (signal) {
    signal.addEventListener(
      'abort',
      () => {
        gotResult = true;
        for (const w of workers) {
          w.terminate();
        }
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
        const worker = getWorker();
        workers[workerIndex] = worker;
        // eslint-disable-next-line no-await-in-loop
        const raceResult = await Promise.race([
          workerSendAndReceive<ReturnType<Func>>(worker)(
            getPayload({
              workerIndex,
              attempt,
            }),
          ).catch((err: unknown) => {
            console.error(err);
          }),
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
          for (const w of workers) {
            w.terminate();
          }
          return {
            result: raceResult as Awaited<ReturnType<Func>>,
            workerIndex,
            attempt,
          };
        }
        // timed out
        workers[workerIndex]?.terminate();
      }
    },
  );
  const firstResult = (await Promise.race(promises))!;
  return firstResult.result;
};
