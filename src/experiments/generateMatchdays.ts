import { chunk, orderBy, shuffle } from 'lodash';

import { findFirstSolution } from '../utils/backtrack';

import generateFull from './generateFull';

const EASY_NUM_MATCHDAYS = 6;

const generateMatchdays = ({
  teams,
  numPots,
  numMatchdays,
  maxHomeGamesVsPot,
}: {
  teams: readonly number[];
  numPots: number;
  numMatchdays: number;
  maxHomeGamesVsPot: number;
}) => {
  const numTeamsPerPot = teams.length / numPots;
  const numGamesPerMatchday = teams.length / 2;

  const maxGamesAtHome = Math.ceil(numMatchdays / 2);

  console.log('doing for', numMatchdays);

  const foo = new Set(
    numMatchdays > EASY_NUM_MATCHDAYS
      ? generateMatchdays({
          teams,
          numPots,
          numMatchdays: numMatchdays - 1,
          maxHomeGamesVsPot,
        }).flatMap(md => orderBy(md, m => Math.min(m[0], m[1])))
      : [],
  );

  let remainingGames = generateFull(teams);

  remainingGames = orderBy(
    shuffle([
      ...remainingGames,
      ...remainingGames.map(([a, b]) => [b, a] as [number, number]),
    ]),
    [
      // () => Math.random(),
      m => (foo.has(m) ? 0 : 1),
      ([a, b]) => {
        if (a % 2 === 0 && b - a === 1) {
          return 0.0000000001 * a;
        }
        if ((a - b === 3 && b % 4 === 0) || (a - b === 1 && b % 4 === 1)) {
          return 0.0001 * a;
        }
        return Number.POSITIVE_INFINITY;
      },
      ([a, b]) => -Math.abs(a - b),
    ],
  );

  console.log('initial games', JSON.stringify(remainingGames));

  const matches: [number, number][] = [];
  const numHomeGamesByTeam: Record<number, number> = {};
  const numAwayGamesByTeam: Record<number, number> = {};

  /**
   * team:pot:home?
   */
  const hasPlayedWithPotMap: Record<
    `${number}:${number}:${'h' | 'a'}`,
    number
  > = {};

  while (matches.length < numMatchdays * numGamesPerMatchday) {
    console.log('nice');
    // remainingGames = shuffle(remainingGames);

    console.log(numHomeGamesByTeam, numAwayGamesByTeam, hasPlayedWithPotMap);

    console.log('orderedRemainingGames', [...remainingGames]);

    // eslint-disable-next-line no-loop-func
    const pickedMatch = remainingGames.find(m => {
      console.log('test...', m, {
        remainingGames: [...remainingGames],
        matches: [...matches],
      });
      const solution = findFirstSolution(
        {
          source: remainingGames,
          sourceStartFromIndex: 0,
          target: matches,
          numHomeGamesByTeam,
          numAwayGamesByTeam,
          hasPlayedWithPotMap,
          picked: m,
        },
        {
          reject: c => {
            // console.log('c', c);
            const [m1, m2] = c.picked;
            const matches = c.target;

            // Ensure the teams play same number of games at home & away
            if (c.numHomeGamesByTeam[m1] === maxGamesAtHome) {
              return true;
            }
            if (c.numAwayGamesByTeam[m2] === maxGamesAtHome) {
              return true;
            }

            // Ensure neither team has already played on this matchday
            const matchdayIndex = Math.floor(
              matches.length / numGamesPerMatchday,
            );
            if (
              (c.numHomeGamesByTeam[m1] ?? 0) +
                (c.numAwayGamesByTeam[m1] ?? 0) >
              matchdayIndex
            ) {
              return true;
            }
            if (
              (c.numHomeGamesByTeam[m2] ?? 0) +
                (c.numAwayGamesByTeam[m2] ?? 0) >
              matchdayIndex
            ) {
              return true;
            }

            // // Ensure the difference between home & away games is -1, 0 or 1
            // if (
            //   (c.numHomeGamesByTeam[m1] ?? 0) > (c.numAwayGamesByTeam[m1] ?? 0)
            // ) {
            //   return true;
            // }

            // if (
            //   (c.numAwayGamesByTeam[m2] ?? 0) > (c.numHomeGamesByTeam[m2] ?? 0)
            // ) {
            //   return true;
            // }

            const homeTeamPotIndex = Math.floor(m1 / numTeamsPerPot);
            const awayTeamPotIndex = Math.floor(m2 / numTeamsPerPot);

            if (
              c.hasPlayedWithPotMap[`${m1}:${awayTeamPotIndex}:h`] ===
              maxHomeGamesVsPot
            ) {
              return true;
            }

            if (
              c.hasPlayedWithPotMap[`${m2}:${homeTeamPotIndex}:a`] ===
              maxHomeGamesVsPot
            ) {
              return true;
            }

            return false;
          },
          accept: c =>
            c.target.length === numMatchdays * numGamesPerMatchday - 1,
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
              [`${c.picked[0]}:${pickedAwayPotIndex}:h`]:
                (c.hasPlayedWithPotMap[
                  `${c.picked[0]}:${pickedAwayPotIndex}:h`
                ] ?? 0) + 1,
              [`${c.picked[1]}:${pickedHomePotIndex}:a`]:
                (c.hasPlayedWithPotMap[
                  `${c.picked[1]}:${pickedHomePotIndex}:a`
                ] ?? 0) + 1,
            } satisfies typeof c.hasPlayedWithPotMap;

            const oldMatchdayIndex = Math.floor(
              c.target.length / numGamesPerMatchday,
            );

            const newMatchdayIndex = Math.floor(
              newTarget.length / numGamesPerMatchday,
            );

            const newSource = c.source.filter(m => {
              if (
                (m[0] === c.picked[0] && m[1] === c.picked[1]) ||
                (m[0] === c.picked[1] && m[1] === c.picked[0])
              ) {
                return false;
              }
              if (newNumHomeGamesByTeam[m[0]] === maxGamesAtHome) {
                return false;
              }
              if (newNumAwayGamesByTeam[m[1]] === maxGamesAtHome) {
                return false;
              }

              const homePot = Math.floor(m[0] / numTeamsPerPot);
              const awayPot = Math.floor(m[1] / numTeamsPerPot);

              if (
                hasPlayedWithPotMap[`${m[0]}:${awayPot}:h`] ===
                maxHomeGamesVsPot
              ) {
                return false;
              }

              if (
                hasPlayedWithPotMap[`${m[1]}:${homePot}:a`] ===
                maxHomeGamesVsPot
              ) {
                return false;
              }

              return true;
            });

            const bannedMatches = c.source.slice(0, c.sourceStartFromIndex);
            const bannedMatchesSet = new Set(bannedMatches);

            const candidates: (typeof c)[] = [];

            for (let i = 0; i < newSource.length; ++i) {
              const newPicked = newSource[i];
              if (bannedMatchesSet.has(newPicked)) {
                continue;
              }
              candidates.push({
                source: newSource,
                sourceStartFromIndex:
                  newMatchdayIndex === oldMatchdayIndex ? i : 0,
                target: newTarget,
                picked: newPicked,
                numHomeGamesByTeam: newNumHomeGamesByTeam,
                numAwayGamesByTeam: newNumAwayGamesByTeam,
                hasPlayedWithPotMap: newHasPlayedWithPotMap,
              });
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
    console.log('taking', pickedMatch);

    matches.push(pickedMatch);

    numHomeGamesByTeam[pickedMatch[0]] =
      (numHomeGamesByTeam[pickedMatch[0]] ?? 0) + 1;
    numAwayGamesByTeam[pickedMatch[1]] =
      (numAwayGamesByTeam[pickedMatch[1]] ?? 0) + 1;

    const pickedHomePot = Math.floor(pickedMatch[0] / numTeamsPerPot);
    const pickedAwayPot = Math.floor(pickedMatch[1] / numTeamsPerPot);
    hasPlayedWithPotMap[`${pickedMatch[0]}:${pickedAwayPot}:h`] =
      (hasPlayedWithPotMap[`${pickedMatch[0]}:${pickedAwayPot}:h`] ?? 0) + 1;
    hasPlayedWithPotMap[`${pickedMatch[1]}:${pickedHomePot}:a`] =
      (hasPlayedWithPotMap[`${pickedMatch[1]}:${pickedHomePot}:a`] ?? 0) + 1;

    console.log(numHomeGamesByTeam, numAwayGamesByTeam);

    remainingGames = remainingGames.filter(([a, b]) => {
      const justPicked =
        (a === pickedMatch[0] && b === pickedMatch[1]) ||
        (a === pickedMatch[1] && b === pickedMatch[0]);
      if (justPicked) {
        return false;
      }
      // if (numHomeGamesByTeam[a] === maxGamesAtHome) {
      //   return false;
      // }
      // if (numAwayGamesByTeam[b] === maxGamesAtHome) {
      //   return false;
      // }

      const aPot = Math.floor(a / numTeamsPerPot);
      const bPot = Math.floor(b / numTeamsPerPot);

      if (hasPlayedWithPotMap[`${a}:${bPot}:h`] === maxHomeGamesVsPot) {
        return false;
      }

      if (hasPlayedWithPotMap[`${b}:${aPot}:a`] === maxHomeGamesVsPot) {
        return false;
      }

      return true;
    });
    console.log('new remaining', remainingGames);
    console.log('current total', matches.length);
  }

  console.log('done for num matchdays:', numMatchdays);

  return chunk(matches, numGamesPerMatchday);
};

export default generateMatchdays;
