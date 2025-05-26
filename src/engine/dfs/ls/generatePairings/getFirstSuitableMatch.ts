import { chunk, countBy, maxBy, orderBy, range } from 'lodash';

import { findFirstSolution } from '#utils/backtrack';
import { type Country } from '#model/types';
import cartesian from '#utils/cartesian';

interface Team {
  readonly country: Country;
}

export default ({
  teams,
  numPots,
  numTeamsPerPot,
  numMatchdays,
  numGamesPerMatchday,
  isPairedPotMode,
  allGames,
  pickedMatches,
}: {
  teams: readonly Team[];
  numPots: number;
  numTeamsPerPot: number;
  numMatchdays: number;
  numGamesPerMatchday: number;
  isPairedPotMode: boolean;
  allGames: readonly (readonly [number, number])[];
  pickedMatches: readonly (readonly [number, number])[];
}) => {
  const pots = chunk(range(teams.length), numTeamsPerPot);
  const potIndices = range(numPots);
  const maxGamesAtHome = Math.ceil(numMatchdays / 2);
  const maxSameLocMatchesPerPot = isPairedPotMode
    ? numTeamsPerPot / 2
    : numTeamsPerPot;

  const numTeamsByCountry = countBy(teams, t => t.country);

  const numGamesByPotPair: Record<`${number}:${number}`, number> = {};
  const numHomeGamesByTeam: Record<number, number> = {};
  const numAwayGamesByTeam: Record<number, number> = {};
  const numOpponentCountriesByTeam: Record<`${number}:${Country}`, number> = {};

  /**
   * team:pot:home?
   */
  const hasPlayedWithPotMap: Record<
    `${number}:${number}:${'h' | 'a'}`,
    boolean
  > = {};

  for (const [h, a] of pickedMatches) {
    const homeTeam = teams[h];
    const awayTeam = teams[a];

    const homePot = Math.floor(h / numTeamsPerPot);
    const awayPot = Math.floor(a / numTeamsPerPot);

    numGamesByPotPair[`${homePot}:${awayPot}`] =
      (numGamesByPotPair[`${homePot}:${awayPot}`] ?? 0) + 1;
    numHomeGamesByTeam[h] = (numHomeGamesByTeam[h] ?? 0) + 1;
    numAwayGamesByTeam[a] = (numAwayGamesByTeam[a] ?? 0) + 1;
    numOpponentCountriesByTeam[`${h}:${awayTeam.country}`] =
      (numOpponentCountriesByTeam[`${h}:${awayTeam.country}`] ?? 0) + 1;
    numOpponentCountriesByTeam[`${a}:${homeTeam.country}`] =
      (numOpponentCountriesByTeam[`${a}:${homeTeam.country}`] ?? 0) + 1;
    hasPlayedWithPotMap[`${h}:${awayPot}:h`] = true;
    hasPlayedWithPotMap[`${a}:${homePot}:a`] = true;
  }

  const remainingGames = allGames.filter(([a, b]) => {
    if (
      pickedMatches.some(
        m => (m[0] === a && m[1] === b) || (m[0] === b && m[1] === a),
      )
    ) {
      // already played before
      return false;
    }

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

    if (isPairedPotMode) {
      if (hasPlayedWithPotMap[`${a}:${bPot}:a`]) {
        return false;
      }

      if (hasPlayedWithPotMap[`${a}:${bPot ^ 1}:h`]) {
        return false;
      }
    }

    if (hasPlayedWithPotMap[`${b}:${aPot}:a`]) {
      return false;
    }

    if (isPairedPotMode) {
      if (hasPlayedWithPotMap[`${b}:${aPot}:h`]) {
        return false;
      }

      if (hasPlayedWithPotMap[`${b}:${aPot ^ 1}:a`]) {
        return false;
      }
    }

    return true;
  });

  const unorderedPotPairs = cartesian(potIndices, potIndices);
  const potPairs = orderBy(unorderedPotPairs, [m => m[0], m => m[1]]);

  const orderedRemainingGames = orderBy(remainingGames, m => {
    const hPot = Math.floor(m[0] / numTeamsPerPot);
    const aPot = Math.floor(m[1] / numTeamsPerPot);
    return potPairs.findIndex(([a, b]) => a === hPot && b === aPot);
  });

  const numRemainingMatchesByTeam: Record<number, number> = {};
  for (const m of remainingGames) {
    numRemainingMatchesByTeam[m[0]] =
      (numRemainingMatchesByTeam[m[0]] ?? 0) + 1;
    numRemainingMatchesByTeam[m[1]] =
      (numRemainingMatchesByTeam[m[1]] ?? 0) + 1;
  }

  return orderedRemainingGames.find(match => {
    const solution = findFirstSolution(
      {
        source: remainingGames,
        target: pickedMatches,
        numRemainingMatchesByTeam,
        numGamesByPotPair,
        numHomeGamesByTeam,
        numAwayGamesByTeam,
        numOpponentCountriesByTeam,
        hasPlayedWithPotMap,
        picked: match,
      },
      {
        reject: c => {
          const [h, a] = c.picked;

          // Ensure the teams play same number of games at home & away
          if (c.numHomeGamesByTeam[h] === maxGamesAtHome) {
            return true;
          }
          if (c.numAwayGamesByTeam[a] === maxGamesAtHome) {
            return true;
          }

          const homeTeamPotIndex = Math.floor(h / numTeamsPerPot);
          const awayTeamPotIndex = Math.floor(a / numTeamsPerPot);

          if (c.hasPlayedWithPotMap[`${h}:${awayTeamPotIndex}:h`]) {
            return true;
          }

          if (isPairedPotMode) {
            if (c.hasPlayedWithPotMap[`${h}:${awayTeamPotIndex}:a`]) {
              return true;
            }

            if (c.hasPlayedWithPotMap[`${h}:${awayTeamPotIndex ^ 1}:h`]) {
              return true;
            }
          }

          if (c.hasPlayedWithPotMap[`${a}:${homeTeamPotIndex}:a`]) {
            return true;
          }

          if (isPairedPotMode) {
            if (c.hasPlayedWithPotMap[`${a}:${homeTeamPotIndex}:h`]) {
              return true;
            }

            if (c.hasPlayedWithPotMap[`${a}:${homeTeamPotIndex ^ 1}:a`]) {
              return true;
            }
          }

          if (c.numOpponentCountriesByTeam[`${h}:${teams[a].country}`] === 2) {
            return true;
          }

          if (c.numOpponentCountriesByTeam[`${a}:${teams[h].country}`] === 2) {
            return true;
          }

          return false;
        },

        accept: c => c.target.length === numMatchdays * numGamesPerMatchday - 1,

        generate: c => {
          const pickedHomePotIndex = Math.floor(c.picked[0] / numTeamsPerPot);
          const pickedAwayPotIndex = Math.floor(c.picked[1] / numTeamsPerPot);

          const newTarget = [...c.target, c.picked];

          const newNumGamesByPotPair = {
            ...c.numGamesByPotPair,
            [`${pickedHomePotIndex}:${pickedAwayPotIndex}`]:
              (c.numGamesByPotPair[
                `${pickedHomePotIndex}:${pickedAwayPotIndex}`
              ] ?? 0) + 1,
          } as typeof c.numGamesByPotPair;

          const newNumHomeGamesByTeam = {
            ...c.numHomeGamesByTeam,
            [c.picked[0]]: (c.numHomeGamesByTeam[c.picked[0]] ?? 0) + 1,
          } as typeof c.numHomeGamesByTeam;
          const newNumAwayGamesByTeam = {
            ...c.numAwayGamesByTeam,
            [c.picked[1]]: (c.numAwayGamesByTeam[c.picked[1]] ?? 0) + 1,
          } as typeof c.numAwayGamesByTeam;

          const newNumOpponentCountriesByTeam = {
            ...c.numOpponentCountriesByTeam,
            [`${c.picked[0]}:${teams[c.picked[1]].country}`]:
              (c.numOpponentCountriesByTeam[
                `${c.picked[0]}:${teams[c.picked[1]].country}`
              ] ?? 0) + 1,
            [`${c.picked[1]}:${teams[c.picked[0]].country}`]:
              (c.numOpponentCountriesByTeam[
                `${c.picked[1]}:${teams[c.picked[0]].country}`
              ] ?? 0) + 1,
          };

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

            if (newHasPlayedWithPotMap[`${h}:${awayPot}:h`]) {
              return false;
            }

            if (isPairedPotMode) {
              if (newHasPlayedWithPotMap[`${h}:${awayPot}:a`]) {
                return false;
              }

              if (newHasPlayedWithPotMap[`${h}:${awayPot ^ 1}:h`]) {
                return false;
              }
            }

            if (newHasPlayedWithPotMap[`${a}:${homePot}:a`]) {
              return false;
            }

            if (isPairedPotMode) {
              if (newHasPlayedWithPotMap[`${a}:${homePot}:h`]) {
                return false;
              }

              if (newHasPlayedWithPotMap[`${a}:${homePot ^ 1}:a`]) {
                return false;
              }
            }

            return true;
          });

          const [potPairHomePot, potPairAwayPot] = potPairs.find(
            ([hPot, aPot]) =>
              (newNumGamesByPotPair[`${hPot}:${aPot}`] ?? 0) <
              maxSameLocMatchesPerPot,
          )!;

          const newHomeTeamCandidates = pots[potPairHomePot].filter(
            t =>
              !newHasPlayedWithPotMap[`${t}:${potPairAwayPot}:h`] &&
              (!isPairedPotMode ||
                (!newHasPlayedWithPotMap[`${t}:${potPairAwayPot}:a`] &&
                  !newHasPlayedWithPotMap[`${t}:${potPairAwayPot ^ 1}:h`])),
          );
          const newHomeTeam = maxBy(
            newHomeTeamCandidates,
            t => numTeamsByCountry[teams[t].country],
          )!;

          const potentialMatches = newSource.filter(newPicked => {
            const awayPot = Math.floor(newPicked[1] / numTeamsPerPot);
            return newPicked[0] === newHomeTeam && awayPot === potPairAwayPot;
          });

          const newNumRemainingMatchesByTeam = {
            ...c.numRemainingMatchesByTeam,
            [c.picked[0]]: (c.numRemainingMatchesByTeam[c.picked[0]] ?? 0) + 1,
            [c.picked[1]]: (c.numRemainingMatchesByTeam[c.picked[1]] ?? 0) + 1,
          };

          const orderedPotentialMatches = orderBy(potentialMatches, [
            m => -numTeamsByCountry[teams[m[1]].country],
            m => newNumRemainingMatchesByTeam[m[1]],
          ]);

          return orderedPotentialMatches.map(newPicked => ({
            source: newSource,
            target: newTarget,
            picked: newPicked,
            numRemainingMatchesByTeam: newNumRemainingMatchesByTeam,
            numGamesByPotPair: newNumGamesByPotPair,
            numHomeGamesByTeam: newNumHomeGamesByTeam,
            numAwayGamesByTeam: newNumAwayGamesByTeam,
            numOpponentCountriesByTeam: newNumOpponentCountriesByTeam,
            hasPlayedWithPotMap: newHasPlayedWithPotMap,
          }));
        },
      },
    );
    return solution !== undefined;
  })!;
};
