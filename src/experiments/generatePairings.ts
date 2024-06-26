import { orderBy } from 'lodash';

import generateFull from './generateFull';
import getFirstSuitableMatch from './getFirstSuitableMatch';

const generateMatchdays = ({
  teams,
  numPots,
  numMatchdays,
  canPlay,
}: {
  teams: readonly number[];
  numPots: number;
  numMatchdays: number;
  canPlay: (a: number, b: number) => boolean;
}) => {
  const numTeamsPerPot = teams.length / numPots;
  const numGamesPerMatchday = teams.length / 2;

  let allGames = generateFull(teams);

  allGames = [
    ...allGames,
    ...allGames.map(([a, b]) => [b, a] as [number, number]),
  ];

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

  allGames = allGames.filter(([a, b]) => canPlay(a, b));

  // remainingGames = shuffle(remainingGames);

  console.log('initial games', JSON.stringify(allGames));

  const matches: (readonly [number, number])[] = [];

  while (matches.length < numMatchdays * numGamesPerMatchday) {
    console.log('nice');
    // remainingGames = shuffle(remainingGames);

    const pickedMatch = getFirstSuitableMatch({
      allGames,
      matches,
      numTeamsPerPot,
      numMatchdays,
      numGamesPerMatchday,
      numPots,
    });

    console.log('taking', pickedMatch);

    matches.push(pickedMatch);

    console.log('current total', matches.length);
  }

  console.log('done for num matchdays:', numMatchdays);

  return matches;
};

export default generateMatchdays;
