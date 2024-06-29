import delay from 'delay.js';

import workerSendAndReceive from '#utils/worker/sendAndReceive';

import { type Func } from './getFirstSuitableMatch.worker';

const NUM_WORKERS = navigator.hardwareConcurrency - 1;

const fastest: Record<number, number> = Object.fromEntries(
  Array.from(
    {
      length: NUM_WORKERS,
    },
    (_, i) => [i, 0] as const,
  ),
);

export default async (
  options: Omit<Parameters<Func>[0], 'randomArray' | 'shouldShuffle'>,
) => {
  const randomArray = Array.from(
    {
      length: options.allGames.length,
    },
    () => Math.random(),
  );

  const firstResult = await new Promise<{
    index: number;
    result: Awaited<ReturnType<Func>>;
  }>(async resolve => {
    const workers: Worker[] = [];
    let isLoopRunning = true;
    for (let i = 0; isLoopRunning; ++i) {
      console.log('length', workers.length);
      if (workers.length >= NUM_WORKERS) {
        const oldestWorker = workers.shift();
        oldestWorker?.terminate();
      }

      const worker = new Worker(
        new URL('./getFirstSuitableMatch.worker', import.meta.url),
      );
      workers.push(worker);

      // eslint-disable-next-line no-loop-func
      (async () => {
        const result = await workerSendAndReceive<
          Parameters<Func>[0],
          ReturnType<Func>
        >(worker)({
          ...options,
          randomArray,
          shouldShuffle: i > 0,
        });
        isLoopRunning = false;
        for (const w of workers) {
          w.terminate();
        }
        resolve({
          result,
          index: i,
        });
      })();

      // eslint-disable-next-line no-await-in-loop
      await delay(500 * Math.exp(i / 10));
    }
  });

  ++fastest[firstResult.index];

  console.log('fastest worker', fastest);

  return firstResult.result;
};
