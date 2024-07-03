import { orderBy, range, shuffle } from 'lodash';

import generateFull from './generateFull';
import getFirstSuitableMatch from './getFirstSuitableMatch.wrapper';

export default async function* generatePairings<T>({
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

  const matches: (readonly [number, number])[] = [];

  const worker = new Worker(
    new URL('./getFirstSuitableMatch.worker', import.meta.url),
  );

  try {
    while (matches.length < numMatchdays * numGamesPerMatchday) {
      allGames = shuffle(allGames);
      // eslint-disable-next-line no-await-in-loop
      const pickedMatch = await getFirstSuitableMatch({
        // @ts-expect-error Fix this later
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
