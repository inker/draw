import { range, shuffle } from 'lodash';
import delay from 'delay.js';

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
}: {
  season: number;
  tournament: Tournament;
  pots: readonly (readonly T[])[];
  numMatchdays: number;
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

  const worker = new Worker(
    new URL('./getFirstSuitableMatch.worker', import.meta.url),
  );

  try {
    while (matches.length < numMatchdays * numGamesPerMatchday) {
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
        // eslint-disable-next-line no-async-promise-executor
      >(async (resolve, reject) => {
        const extraWorkers: Worker[] = [];

        const resolveWithCleanup: typeof resolve = result => {
          resultObtained = true;
          for (const w of extraWorkers) {
            w.terminate();
          }
          resolve(result);
        };

        let resultObtained = false;
        getFirstSuitableMatch({
          ...payload,
          worker,
          reverseSortingMode: 0,
        })
          .then(resolveWithCleanup)
          .catch(reject);

        await delay(250);

        if (resultObtained) {
          return;
        }
        // eslint-disable-next-line no-console
        console.log('extra aid to the worker');
        extraWorkers.push(
          new Worker(
            new URL('./getFirstSuitableMatch.worker', import.meta.url),
          ),
        );
        getFirstSuitableMatch({
          ...payload,
          worker: extraWorkers.at(-1)!,
          reverseSortingMode: 1,
        })
          .then(resolveWithCleanup)
          .catch(reject);

        await delay(0);

        if (resultObtained) {
          return;
        }
        // eslint-disable-next-line no-console
        console.log('adding another worker');
        extraWorkers.push(
          new Worker(
            new URL('./getFirstSuitableMatch.worker', import.meta.url),
          ),
        );
        getFirstSuitableMatch({
          ...payload,
          worker: extraWorkers.at(-1)!,
          reverseSortingMode: 2,
        })
          .then(resolveWithCleanup)
          .catch(reject);
      });

      matches.push(pickedMatch);

      yield [teams[pickedMatch[0]], teams[pickedMatch[1]]] as const;
    }
  } finally {
    worker.terminate();
  }
}
