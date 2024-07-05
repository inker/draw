import { range, shuffle } from 'lodash';

import { type Country } from '#model/types';

import generateFull from './generateFull';
import getFirstSuitableMatch from './getFirstSuitableMatch.wrapper';

interface Team {
  country: Country;
}

export default async function* generatePairings<T extends Team>({
  pots,
  numMatchdays,
  isMatchPossible,
}: {
  pots: readonly (readonly T[])[];
  numMatchdays: number;
  isMatchPossible: (h: T, a: T) => boolean;
}) {
  const teams = pots.flat();
  const numTeamsPerPot = pots[0].length;
  const numGamesPerMatchday = teams.length / 2;

  const teamIndices = range(teams.length);

  let allGames = generateFull(teamIndices);

  allGames = [...allGames, ...allGames.map(([a, b]) => [b, a] as const)];

  allGames = allGames.filter(([h, a]) => isMatchPossible(teams[h], teams[a]));

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
