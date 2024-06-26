import { orderBy, shuffle } from 'lodash';

import { findFirstSolution } from '../utils/backtrack';

import generateFull from './generateFull';

export const getFirstSuitableMatch = ({
  allGames,
  matches,
  numTeamsPerPot,
  numMatchdays,
  numGamesPerMatchday,
  numPots,
}: {
  numPots: number;
  allGames: readonly (readonly [number, number])[];
  matches: readonly (readonly [number, number])[];
  numTeamsPerPot: number;
  numMatchdays: number;
  numGamesPerMatchday: number;
}) => {
  const maxGamesAtHome = Math.ceil(numMatchdays / 2);

  const numHomeGamesByTeam: Record<number, number> = {};
  const numAwayGamesByTeam: Record<number, number> = {};

  /**
   * team:pot:home?
   */
  const hasPlayedWithPotMap: Record<
    `${number}:${number}:${'h' | 'a'}`,
    boolean
  > = {};

  for (const m of matches) {
    const homePot = Math.floor(m[0] / numTeamsPerPot);
    const awayPot = Math.floor(m[1] / numTeamsPerPot);
    numHomeGamesByTeam[m[0]] = (numHomeGamesByTeam[m[0]] ?? 0) + 1;
    numAwayGamesByTeam[m[1]] = (numAwayGamesByTeam[m[1]] ?? 0) + 1;
    hasPlayedWithPotMap[`${m[0]}:${awayPot}:h`] = true;
    hasPlayedWithPotMap[`${m[1]}:${homePot}:a`] = true;
  }

  const remainingGames = allGames.filter(([a, b]) => {
    if (numHomeGamesByTeam[a] === maxGamesAtHome) {
      return false;
    }
    if (numAwayGamesByTeam[b] === maxGamesAtHome) {
      return false;
    }

    const aPot = Math.floor(a / numTeamsPerPot);
    const bPot = Math.floor(b / numTeamsPerPot);

    if (hasPlayedWithPotMap[`${a}:${bPot}:h`]) {
      return false;
    }

    if (hasPlayedWithPotMap[`${b}:${aPot}:a`]) {
      return false;
    }

    return true;
  });

  return shuffle(remainingGames).find(m => {
    console.log('test...', m, {
      remainingGames: [...remainingGames],
      matches: [...matches],
    });
    const solution = findFirstSolution(
      {
        source: remainingGames,
        target: matches,
        numHomeGamesByTeam,
        numAwayGamesByTeam,
        hasPlayedWithPotMap,
        picked: m,
      },
      {
        reject: c => {
          const [m1, m2] = c.picked;

          // Ensure the teams play same number of games at home & away
          if (c.numHomeGamesByTeam[m1] === maxGamesAtHome) {
            return true;
          }
          if (c.numAwayGamesByTeam[m2] === maxGamesAtHome) {
            return true;
          }

          const homeTeamPotIndex = Math.floor(m1 / numTeamsPerPot);
          const awayTeamPotIndex = Math.floor(m2 / numTeamsPerPot);

          if (c.hasPlayedWithPotMap[`${m1}:${awayTeamPotIndex}:h`]) {
            return true;
          }

          if (c.hasPlayedWithPotMap[`${m2}:${homeTeamPotIndex}:a`]) {
            return true;
          }

          return false;
        },

        accept: c => c.target.length === numMatchdays * numGamesPerMatchday - 1,

        generate: c => {
          const newTarget = [...c.target, c.picked];
          const newNumHomeGamesByTeam = {
            ...c.numHomeGamesByTeam,
            [c.picked[0]]: (c.numHomeGamesByTeam[c.picked[0]] ?? 0) + 1,
          } as typeof c.numHomeGamesByTeam;
          const newNumAwayGamesByTeam = {
            ...c.numAwayGamesByTeam,
            [c.picked[1]]: (c.numAwayGamesByTeam[c.picked[1]] ?? 0) + 1,
          } as typeof c.numAwayGamesByTeam;

          const pickedHomePotIndex = Math.floor(c.picked[0] / numTeamsPerPot);
          const pickedAwayPotIndex = Math.floor(c.picked[1] / numTeamsPerPot);

          const newHasPlayedWithPotMap: typeof c.hasPlayedWithPotMap = {
            ...c.hasPlayedWithPotMap,
            [`${c.picked[0]}:${pickedAwayPotIndex}:h`]: true,
            [`${c.picked[1]}:${pickedHomePotIndex}:a`]: true,
          } satisfies typeof c.hasPlayedWithPotMap;

          const newSource = c.source.filter(([h, a]) => {
            if (
              (h === c.picked[0] && a === c.picked[1]) ||
              (h === c.picked[1] && a === c.picked[0])
            ) {
              return false;
            }
            if (newNumHomeGamesByTeam[h] === maxGamesAtHome) {
              return false;
            }
            if (newNumAwayGamesByTeam[a] === maxGamesAtHome) {
              return false;
            }

            const homePot = Math.floor(h / numTeamsPerPot);
            const awayPot = Math.floor(a / numTeamsPerPot);

            if (hasPlayedWithPotMap[`${h}:${awayPot}:h`]) {
              return false;
            }

            if (hasPlayedWithPotMap[`${a}:${homePot}:a`]) {
              return false;
            }

            return true;
          });

          const candidates: (typeof c)[] = [];

          const lowestRemainingTeam =
            newSource.length > 0
              ? // eslint-disable-next-line unicorn/no-array-reduce
                newSource.reduce(
                  (prev, cur) => Math.min(prev, ...cur),
                  Math.min(...newSource[0]),
                )
              : undefined;

          if (lowestRemainingTeam !== undefined) {
            let nextPot: number | undefined;
            let nextPlace: 'h' | 'a' | undefined;
            for (let i = 0; i < numPots; ++i) {
              if (!newHasPlayedWithPotMap[`${lowestRemainingTeam}:${i}:h`]) {
                nextPot = i;
                nextPlace = 'h';
                break;
              }
              if (!newHasPlayedWithPotMap[`${lowestRemainingTeam}:${i}:a`]) {
                nextPot = i;
                nextPlace = 'a';
                break;
              }
            }

            for (const newPicked of newSource) {
              const homePot = Math.floor(newPicked[0] / numTeamsPerPot);
              const awayPot = Math.floor(newPicked[1] / numTeamsPerPot);

              const isMatchGood =
                (nextPlace === 'h' &&
                  newPicked[0] === lowestRemainingTeam &&
                  awayPot === nextPot) ||
                (nextPlace === 'a' &&
                  newPicked[1] === lowestRemainingTeam &&
                  homePot === nextPot);
              if (isMatchGood) {
                candidates.push({
                  source: newSource,
                  target: newTarget,
                  picked: newPicked,
                  numHomeGamesByTeam: newNumHomeGamesByTeam,
                  numAwayGamesByTeam: newNumAwayGamesByTeam,
                  hasPlayedWithPotMap: newHasPlayedWithPotMap,
                });
              }
            }
          }

          return candidates;
        },
      },
    );
    if (!solution) {
      console.log('sol', solution);
    }
    // console.log('sol', solution);
    return solution !== undefined;
  })!;
};

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
