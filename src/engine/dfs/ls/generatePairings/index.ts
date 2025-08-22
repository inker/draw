import { range, shuffle } from 'lodash';
import delay from 'delay.js';

import WorkerManager from '#utils/WorkerManager';
import type Tournament from '#model/Tournament';
import { type UefaCountry } from '#model/types';
import incompatibleCountries from '#engine/predicates/uefa/utils/incompatibleCountries';

import generateFull from './generateFull';
import getFirstSuitableMatch from './getFirstSuitableMatch.wrapper';

interface Team {
  readonly country: UefaCountry;
}

export default async function* generatePairings<T extends Team>({
  season,
  tournament,
  pots,
  numMatchdays,
  signal,
}: {
  season: number;
  tournament: Tournament;
  pots: readonly (readonly T[])[];
  numMatchdays: number;
  signal?: AbortSignal;
}) {
  const teams = pots.flat();
  const numTeamsPerPot = pots[0].length;
  const numGamesPerMatchday = teams.length / 2;

  const teamIndices = range(teams.length);

  let allGames = generateFull(teamIndices);

  allGames = [...allGames, ...allGames.map(([a, b]) => [b, a] as const)];

  const isCountryIncompatibleWith = incompatibleCountries(season);

  allGames = allGames.filter(([h, a]) => {
    const hTeam = teams[h];
    const aTeam = teams[a];
    const isImpossible =
      hTeam.country === aTeam.country ||
      isCountryIncompatibleWith(hTeam)(aTeam);
    return !isImpossible;
  });

  const matches: (readonly [number, number])[] = [];

  const workerManager = new WorkerManager({
    maker: () =>
      new Worker(new URL('./getFirstSuitableMatch.worker', import.meta.url)),
  });

  let worker = workerManager.register();

  try {
    let shouldStop = false;
    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          shouldStop = true;
        },
        {
          once: true,
        },
      );
    }

    while (!shouldStop && matches.length < numMatchdays * numGamesPerMatchday) {
      allGames = shuffle(allGames);
      const payload = {
        teams,
        numPots: pots.length,
        numTeamsPerPot,
        numMatchdays,
        numGamesPerMatchday,
        isPairedPotMode: tournament === 'ecl',
        allGames,
        pickedMatches: matches,
      } satisfies Omit<
        Parameters<typeof getFirstSuitableMatch>[0],
        'reverseSortingMode' | 'worker'
      >;
      // eslint-disable-next-line no-await-in-loop
      const pickedMatch = await new Promise<
        Awaited<ReturnType<typeof getFirstSuitableMatch>>
        // eslint-disable-next-line no-async-promise-executor, no-loop-func
      >(async (resolve, reject) => {
        const extraWorkers: Worker[] = [];

        const resolveWithCleanup = (
          successfulWorker: Worker,
          result: Parameters<typeof resolve>[0],
        ) => {
          resultObtained = true;
          for (const w of extraWorkers) {
            if (w === successfulWorker) {
              continue;
            }
            workerManager.kill(w);
          }
          if (successfulWorker !== worker) {
            workerManager.kill(worker);
            worker = successfulWorker;
          }
          resolve(result);
        };

        const rejectWithCleanup: typeof reject = (err: Error) => {
          for (const w of extraWorkers) {
            workerManager.kill(w);
          }
          reject(err);
        };

        let resultObtained = false;
        getFirstSuitableMatch({
          ...payload,
          worker,
          reverseSortingMode: 0,
        })
          .then(result => {
            resolveWithCleanup(worker, result);
          })
          .catch(rejectWithCleanup);

        await delay(250);

        for (let i = 1; i < 3; ++i) {
          // eslint-disable-next-line no-await-in-loop
          await delay(0);
          if (resultObtained) {
            return;
          }
          // eslint-disable-next-line no-console
          console.log('adding extra worker', i);
          const extraWorker = workerManager.register();
          extraWorkers.push(extraWorker);
          getFirstSuitableMatch({
            ...payload,
            worker: extraWorker,
            reverseSortingMode: i as 0 | 1 | 2,
          })
            .then(result => {
              resolveWithCleanup(extraWorker, result);
            })
            .catch(rejectWithCleanup);
        }
      });

      matches.push(pickedMatch);

      yield [teams[pickedMatch[0]], teams[pickedMatch[1]]] as const;
    }
  } finally {
    workerManager.killAll();
  }
}
