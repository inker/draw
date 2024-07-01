import raceWorkers from '#utils/raceWorkers';

import { type Func } from './getFirstSuitableMatch.worker';

const NUM_WORKERS = Math.max(1, navigator.hardwareConcurrency - 1);

export default async (
  options: Omit<Parameters<Func>[0], 'randomArray' | 'shouldShuffle'>,
) =>
  raceWorkers<Func>({
    numWorkers: NUM_WORKERS,
    getWorker: () =>
      new Worker(new URL('./getFirstSuitableMatch.worker', import.meta.url)),
    getPayload: (workerIndex, attempt) => {
      const randomArray = Array.from(
        {
          length: options.allGames.length,
        },
        () => Math.random(),
      );
      const shouldNotShuffle = workerIndex === 0 && attempt === 0;
      return {
        ...options,
        randomArray,
        shouldShuffle: !shouldNotShuffle,
      };
    },
    getTimeout: (workerIndex, iteration) => {
      const factor = 7 / (workerIndex + 1);
      return factor * Math.min(5000, 1000 * Math.exp(iteration / 10));
    },
  });
