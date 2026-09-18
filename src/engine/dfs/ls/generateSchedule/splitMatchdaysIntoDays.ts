import {
  chunk,
  countBy,
  difference,
  mapValues,
  orderBy,
  shuffle,
} from 'lodash';

import { type UefaCountry } from '#model/types';
import type Tournament from '#model/Tournament';
import popularityRank from '#model/popularityRank';
import { findFirstSolutionMutable } from '#utils/backtrack';
import combine from '#utils/combine';

interface Team {
  readonly name: string;
  readonly country: UefaCountry;
}

/**
 * The season the Champions League starts opening with a match of its own,
 * played by the holders a day before the rest of matchday 1
 */
export const firstSeasonWithOpeningMatch = 2027;

export const hasOpeningMatch = (tournament: Tournament, season: number) =>
  tournament === 'cl' && season >= firstSeasonWithOpeningMatch;

// TODO: remove this hardcode
function getDayCapacities({
  tournament,
  season,
  matchdayIndex,
  numMatchdays,
  matchdaySize,
}: {
  tournament: Tournament;
  season: number;
  matchdayIndex: number;
  numMatchdays: number;
  matchdaySize: number;
}) {
  // Matchday 1 is checked before the last matchday,
  // so that a one-matchday draw still opens the way a full season does
  if (tournament === 'cl' && matchdayIndex === 0) {
    if (!hasOpeningMatch(tournament, season)) {
      return [matchdaySize / 3, matchdaySize / 3, matchdaySize / 3];
    }
    // 1-9-8 for a full Champions League matchday
    const rest = matchdaySize - 1;
    return [1, Math.ceil(rest / 2), Math.floor(rest / 2)];
  }

  if (matchdayIndex === numMatchdays - 1) {
    return [matchdaySize];
  }

  return [matchdaySize / 2, matchdaySize / 2];
}

const findOpeningMatch = ({
  matchday,
  teams,
  titleHolder,
}: {
  matchday: readonly (readonly [number, number])[];
  teams: readonly Team[];
  titleHolder: string | undefined;
}) => {
  if (!titleHolder) {
    throw new Error(
      'No title holder is on record for this season, so there is no opening match to schedule',
    );
  }
  // The holders host the opener, so only their home game qualifies.
  // assignGamesToMatchdays is what guarantees they have one on this matchday.
  const match = matchday.find(([home]) => teams[home].name === titleHolder);
  if (!match) {
    throw new Error(
      `The title holder on record, ${titleHolder}, is not at home on the first matchday`,
    );
  }
  return match;
};

export default ({
  matchdays,
  tournament,
  season,
  matchdaySize,
  teams,
  titleHolder,
}: {
  matchdays: readonly (readonly [number, number])[][];
  tournament: Tournament;
  season: number;
  matchdaySize: number;
  teams: readonly Team[];
  titleHolder?: string;
}) => {
  const numMatchdays = matchdays.length;

  const newMatchdays: (readonly [number, number])[][][] = [];
  for (const [matchdayIndex, md] of matchdays.entries()) {
    const dayCapacities = getDayCapacities({
      tournament,
      season,
      matchdayIndex,
      numMatchdays,
      matchdaySize,
    });

    // The opening match is settled by who holds the title rather than by this solver,
    // so it comes out of the matchday before the rest is split over the days that are left.
    const openingMatch =
      hasOpeningMatch(tournament, season) && matchdayIndex === 0
        ? findOpeningMatch({
            matchday: md,
            teams,
            titleHolder,
          })
        : undefined;

    const capacities = openingMatch ? dayCapacities.slice(1) : dayCapacities;
    const areDaysInterchangeable = capacities.every(
      capacity => capacity === capacities[0],
    );

    const matchesToSplit = openingMatch
      ? md.filter(match => match !== openingMatch)
      : md;
    const shuffledMd = shuffle(matchesToSplit);
    const days = capacities.map(() => [] as (readonly [number, number])[]);

    // Counted over the clubs still to be placed rather than the whole field:
    // the opening match is already on a day of its own,
    // so letting its two clubs keep a share of the remaining days' allowance
    // would buy their compatriots a slot nobody needs.
    const teamsToSplit = matchesToSplit.flat();
    const numTeamsByCountry = countBy(teamsToSplit, i => teams[i].country);
    const allCountries = Object.keys(numTeamsByCountry) as UefaCountry[];

    // Team indices grouped by country, each ordered by popularity (most first),
    // falling back to seeding position for clubs that aren't listed.
    const orderedIndicesByCountry = mapValues(
      Object.groupBy(teamsToSplit, i => teams[i].country),
      indices => orderBy(indices, i => popularityRank(teams[i], i)),
    );

    // The most popular clubs from a country must play on different days:
    // chunk each country's popularity order into groups the size of the day
    // count, so the top `days.length` clubs are split across the days, the
    // next batch too, & so on.
    // For a two-day matchday this is exactly the TV pairing (groups of two).
    const separationGroups = Object.values(orderedIndicesByCountry)
      .flatMap(indices => chunk(indices, days.length))
      .filter(group => group.length > 1);

    const teamsFromCountryByDay = mapValues(numTeamsByCountry, n => {
      const quotient = Math.floor(n / days.length);
      const remainder = n % days.length;
      return remainder === 0
        ? {
            maxAllowed: quotient,
            numMaxes: days.length,
          }
        : {
            maxAllowed: quotient + 1,
            numMaxes: remainder,
          };
    }) as Record<
      UefaCountry,
      {
        maxAllowed: number;
        numMaxes: number;
      }
    >;

    // Relax the popularity separation one group at a time (least popular
    // first) until the matchday can be split, dropping every group if need be.
    let dayAssignment: readonly number[] | undefined;
    for (
      let numEliminatedGroups = 0;
      numEliminatedGroups <= separationGroups.length && !dayAssignment;
      ++numEliminatedGroups
    ) {
      for (const eliminatedGroups of combine(
        separationGroups.toReversed(),
        numEliminatedGroups,
      )) {
        const remainingGroups = difference(separationGroups, eliminatedGroups);

        const groupMatesByTeam = new Map<number, readonly number[]>();
        for (const group of remainingGroups) {
          for (const team of group) {
            groupMatesByTeam.set(
              team,
              group.filter(other => other !== team),
            );
          }
        }

        // Assign every match in the matchday to a day by backtracking over
        // mutable counters (apply / undo) rather than cloning the whole state
        // at each node.
        const scheduleDay = shuffledMd.map(() => -1);
        const numMatchesByDay = days.map(() => 0);
        // day index each team is committed to, -1 when not yet placed
        const dayByTeam = new Int8Array(teams.length).fill(-1);
        const countryTeamsByDay = new Map<UefaCountry, number[]>(
          allCountries.map(
            country => [country, days.map(() => 0)] as [UefaCountry, number[]],
          ),
        );
        let numPlaced = 0;

        const solved = findFirstSolutionMutable<readonly [number, number]>({
          isSolved: () => numPlaced === shuffledMd.length,

          getCandidates: () => {
            const matchIndex = numPlaced;
            // Anchor the first match to day 0 to break day-permutation
            // symmetry, which only exists while the days are the same size.
            const isAnchored = matchIndex === 0 && areDaysInterchangeable;
            const candidateDays = isAnchored ? [0] : days.map((_, day) => day);

            const feasibleDays = candidateDays.filter(day => {
              if (numMatchesByDay[day] === capacities[day]) {
                return false;
              }
              for (const team of shuffledMd[matchIndex]) {
                // a group mate already on this day breaks the separation
                const mates = groupMatesByTeam.get(team);
                if (mates?.some(mate => dayByTeam[mate] === day)) {
                  return false;
                }
                // adding this team must not push more days to the per-country
                // cap than the allowance permits
                const { country } = teams[team];
                const { maxAllowed, numMaxes } = teamsFromCountryByDay[country];
                const counts = countryTeamsByDay.get(country)!;
                let numAtMax = 0;
                for (const [d, base] of counts.entries()) {
                  if ((d === day ? base + 1 : base) >= maxAllowed) {
                    ++numAtMax;
                  }
                }
                if (numAtMax > numMaxes) {
                  return false;
                }
              }
              return true;
            });

            if (isAnchored) {
              return feasibleDays.map(day => [matchIndex, day] as const);
            }

            // Prefer days where this match's countries are least represented
            // (an empty day is strongly preferred), random tie-breaking.
            const [firstTeam, secondTeam] = shuffledMd[matchIndex];
            const firstCounts = countryTeamsByDay.get(
              teams[firstTeam].country,
            )!;
            const secondCounts = countryTeamsByDay.get(
              teams[secondTeam].country,
            )!;
            return orderBy(shuffle(feasibleDays), day => {
              const first =
                firstCounts[day] === 0 ? -1_000_000 : firstCounts[day];
              const second =
                secondCounts[day] === 0 ? -1_000_000 : secondCounts[day];
              return first + second;
            }).map(day => [matchIndex, day] as const);
          },

          apply: ([matchIndex, day]) => {
            const [firstTeam, secondTeam] = shuffledMd[matchIndex];
            scheduleDay[matchIndex] = day;
            ++numMatchesByDay[day];
            dayByTeam[firstTeam] = day;
            dayByTeam[secondTeam] = day;
            ++countryTeamsByDay.get(teams[firstTeam].country)![day];
            ++countryTeamsByDay.get(teams[secondTeam].country)![day];
            ++numPlaced;
          },

          undo: ([matchIndex, day]) => {
            const [firstTeam, secondTeam] = shuffledMd[matchIndex];
            scheduleDay[matchIndex] = -1;
            --numMatchesByDay[day];
            dayByTeam[firstTeam] = -1;
            dayByTeam[secondTeam] = -1;
            --countryTeamsByDay.get(teams[firstTeam].country)![day];
            --countryTeamsByDay.get(teams[secondTeam].country)![day];
            --numPlaced;
          },
        });

        if (solved) {
          dayAssignment = scheduleDay;
          break;
        }
      }
    }

    if (!dayAssignment) {
      throw new Error('No solution found after all');
    }

    for (const [matchIndex, day] of dayAssignment.entries()) {
      days[day].push(shuffledMd[matchIndex]);
    }

    // Days of different sizes sit at fixed points in the calendar,
    // so only same-sized ones can be swapped round.
    const shuffledDays = days.map(day => shuffle(day));
    const orderedDays = areDaysInterchangeable
      ? shuffle(shuffledDays)
      : shuffledDays;

    newMatchdays.push(
      openingMatch ? [[openingMatch], ...orderedDays] : orderedDays,
    );
  }

  return newMatchdays;
};
