import delay from 'delay.js';

import workerSendAndReceive from '#utils/worker/sendAndReceive';

export default async <Func extends (...args: any) => void>({
  numWorkers,
  getWorker,
  getPayload,
  getTimeout,
  signal,
}: {
  numWorkers: number;
  getWorker: () => Worker;
  getPayload: (workerIndex: number, attempt: number) => Parameters<Func>[0];
  getTimeout: (workerIndex: number, attempt: number) => number;
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
      length: numWorkers,
    },
    async (_, workerIndex) => {
      for (let attempt = 0; !gotResult; ++attempt) {
        if (workerIndex === 0) {
          console.log(
            'spawning',
            workerIndex,
            attempt,
            getTimeout(workerIndex, attempt),
          );
        }
        const worker = getWorker();
        workers[workerIndex] = worker;
        // eslint-disable-next-line no-await-in-loop
        const raceResult = await Promise.race([
          workerSendAndReceive<Parameters<Func>[0], ReturnType<Func>>(worker)(
            getPayload(workerIndex, attempt),
          ).catch(err => {
            console.error(err);
          }),
          delay(getTimeout(workerIndex, attempt)),
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
