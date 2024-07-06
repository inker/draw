import { range, shuffle } from 'lodash';

import { type UefaCountry } from '#model/types';
import incompatibleCountries from '#engine/predicates/uefa/utils/incompatibleCountries';

import generateFull from './generateFull';
import getFirstSuitableMatch from './getFirstSuitableMatch.wrapper';

interface Team {
  readonly country: UefaCountry;
}

export default async function* generatePairings<T extends Team>({
  season,
  pots,
  numMatchdays,
}: {
  season: number;
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
      // eslint-disable-next-line no-await-in-loop
      const pickedMatch = await getFirstSuitableMatch({
        teams,
        numPots: pots.length,
        numTeamsPerPot,
        numMatchdays,
        numGamesPerMatchday,
        allGames,
        pickedMatches: matches,
        worker,
      });
      matches.push(pickedMatch);

      yield [teams[pickedMatch[0]], teams[pickedMatch[1]]] as const;
    }
  } finally {
    worker.terminate();
  }
}
