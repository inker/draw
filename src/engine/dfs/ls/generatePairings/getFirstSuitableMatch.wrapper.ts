import raceWorkers from '#utils/raceWorkers';

import { type Func } from './getFirstSuitableMatch.worker';

const NUM_WORKERS = Math.max(1, navigator.hardwareConcurrency - 1);

export default async ({
  signal,
  ...options
}: Omit<Parameters<Func>[0], 'randomArray'> & {
  signal?: AbortSignal;
}) =>
  raceWorkers<Func>({
    numWorkers: NUM_WORKERS,
    getWorker: () =>
      new Worker(new URL('./getFirstSuitableMatch.worker', import.meta.url)),
    getPayload: () => {
      const randomArray = Array.from(
        {
          length: options.allGames.length,
        },
        () => Math.random(),
      );
      return {
        ...options,
        randomArray,
      };
    },
    getTimeout: (workerIndex, iteration) => {
      const factor = workerIndex === 0 ? 100 : 7 / (workerIndex + 1);
      return factor * Math.min(5000, 1000 * Math.exp(iteration / 10));
    },
    signal,
  });
