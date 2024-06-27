import { orderBy, range, shuffle } from 'lodash';

import generateFull from './generateFull';
import getFirstSuitableMatch from './getFirstSuitableMatch.wrapper';

export default async <T>({
  pots,
  numMatchdays,
  isMatchPossible,
}: {
  pots: readonly (readonly T[])[];
  numMatchdays: number;
  isMatchPossible: (h: T, a: T) => boolean;
}) => {
  console.log(JSON.stringify(pots));
  const teams = pots.flat();
  const numTeamsPerPot = pots[0].length;
  const numGamesPerMatchday = teams.length / 2;

  const teamIndices = range(teams.length);

  let allGames = generateFull(teamIndices);

  allGames = [...allGames, ...allGames.map(([a, b]) => [b, a] as const)];

  allGames = orderBy(allGames, [
    m => Math.min(...m),
    m => Math.max(...m),
    // () => Math.random(),
    // ([a, b]) => {
    //   if (a % 2 === 0 && b - a === 1) {
    //     return 0.0000000001 * a;
    //   }
    //   if ((a - b === 3 && b % 4 === 0) || (a - b === 1 && b % 4 === 1)) {
    //     return 0.0001 * a;
    //   }
    //   return Number.POSITIVE_INFINITY;
    // },
    // ([a, b]) => -Math.abs(a - b),
  ]);

  allGames = allGames.filter(([h, a]) => isMatchPossible(teams[h], teams[a]));

  allGames = shuffle(allGames);

  console.log('initial games', allGames.length, JSON.stringify(allGames));

  const matches: (readonly [number, number])[] = [];

  while (matches.length < numMatchdays * numGamesPerMatchday) {
    console.log('nice');
    // remainingGames = shuffle(remainingGames);

    // eslint-disable-next-line no-await-in-loop
    const pickedMatch = await getFirstSuitableMatch({
      numPots: pots.length,
      numTeamsPerPot,
      numMatchdays,
      numGamesPerMatchday,
      allGames,
      pickedMatches: matches,
    });

    console.log('taking', pickedMatch);

    matches.push(pickedMatch);

    console.log('current total', matches.length);
  }

  console.log('done for num matchdays:', numMatchdays);

  return matches.map(([h, a]) => [teams[h], teams[a]] as const);
};
