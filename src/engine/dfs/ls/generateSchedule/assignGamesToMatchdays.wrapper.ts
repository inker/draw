import raceWorkers from '#utils/worker/raceWorkers';

import { type Func } from './assignGamesToMatchdays.worker';
import { type Ban } from './homeAwayPatterns';

export default ({
  matchdaySize,
  allGames,
  alternatingPairs,
  bans,
  cannotHostSameDayPairs,
  randomSeed,
  getNumWorkers,
  signal,
}: {
  matchdaySize: number;
  allGames: readonly (readonly [number, number])[];
  alternatingPairs: readonly (readonly [number, number])[];
  bans: readonly Ban[];
  cannotHostSameDayPairs: readonly (readonly [number, number])[];
  randomSeed: number;
  getNumWorkers: () => number;
  signal?: AbortSignal;
}) =>
  raceWorkers<Func>({
    numWorkers: getNumWorkers,
    getWorker: () =>
      new Worker(new URL('./assignGamesToMatchdays.worker', import.meta.url)),
    getPayload: ({ workerIndex, attempt }) => ({
      matchdaySize,
      // the solver picks games dynamically,
      // so the input order only seeds tie-breaking
      allGames,
      alternatingPairs,
      bans,
      cannotHostSameDayPairs,
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
