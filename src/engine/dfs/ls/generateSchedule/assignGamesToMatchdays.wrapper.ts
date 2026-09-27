import raceWorkers from '#utils/worker/raceWorkers';

import { type Func } from './assignGamesToMatchdays.worker';

export default ({
  randomSeed,
  getNumWorkers,
  signal,
  ...payload
}: Parameters<Func>[0] & {
  randomSeed: number;
  getNumWorkers: () => number;
  signal?: AbortSignal;
}) =>
  raceWorkers<Func>({
    numWorkers: getNumWorkers,
    getWorker: () =>
      new Worker(new URL('./assignGamesToMatchdays.worker', import.meta.url)),
    getPayload: ({ workerIndex, attempt }) => ({
      ...payload,
      // The solver is deterministic in its seed
      // & every worker is handed the same games,
      // so without an offset of its own
      // each worker would repeat the identical search
      // & the race would buy nothing.
      // Two irrationals keep worker & attempt off each other's offsets.
      randomSeed:
        (randomSeed + workerIndex * Math.SQRT2 + attempt * Math.PI) % 1,
    }),
    getTimeout: () => 5000,
    signal,
  });
