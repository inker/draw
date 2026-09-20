import { chunk, difference, orderBy, range } from 'lodash';

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
 * Home team index first
 */
type Match = readonly [number, number];

/**
 * How a country's clubs may be spread over the days of one matchday:
 * at most `maxAllowed` of them on any one day,
 * & at most `numMaxes` days may hold that many
 */
interface Allowance {
  maxAllowed: number;
  numMaxes: number;
}

/**
 * How many days of the matchday a country's clubs have to cover between them,
 * & how many clubs it has to do it with
 */
interface Coverage {
  country: UefaCountry;
  numTeams: number;
  minDays: number;
}

/**
 * Every way of keeping as much of the list as possible:
 * the fewest constraints dropped first,
 * & the ones latest in the list before the ones ahead of them
 */
function* relaxations<T>(constraints: readonly T[]) {
  for (
    let numEliminated = 0;
    numEliminated <= constraints.length;
    ++numEliminated
  ) {
    for (const eliminated of combine(constraints.toReversed(), numEliminated)) {
      yield difference(constraints, eliminated);
    }
  }
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
  matchday: readonly Match[];
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

/**
 * The day each match belongs to, in the order the matches were given
 */
const findDayAssignment = ({
  matches,
  teams,
  capacities,
  countries,
  coverages,
  separationGroups,
  allowanceByCountry,
  areDaysInterchangeable,
}: {
  matches: readonly Match[];
  teams: readonly Team[];
  capacities: readonly number[];
  countries: readonly UefaCountry[];
  coverages: readonly Coverage[];
  separationGroups: readonly (readonly number[])[];
  allowanceByCountry: ReadonlyMap<UefaCountry, Allowance>;
  areDaysInterchangeable: boolean;
}) => {
  const allDays = range(capacities.length);

  // Every popularity tuple goes before a single country's coverage does:
  // which of a country's clubs are split over the days
  // matters less than the country reaching every day it has the clubs for.
  for (const remainingCoverages of relaxations(coverages)) {
    const coverageByCountry = new Map(
      remainingCoverages.map(coverage => [coverage.country, coverage] as const),
    );

    for (const remainingGroups of relaxations(separationGroups)) {
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
      const scheduleDay = matches.map(() => -1);
      const numMatchesByDay = allDays.map(() => 0);
      // day index each team is committed to, -1 when not yet placed
      const dayByTeam = new Int8Array(teams.length).fill(-1);
      const countryTeamsByDay = new Map(
        countries.map(country => [country, allDays.map(() => 0)] as const),
      );
      let numPlaced = 0;

      const solved = findFirstSolutionMutable<Match>({
        isSolved: () => numPlaced === matches.length,

        getCandidates: () => {
          const matchIndex = numPlaced;
          const [firstTeam, secondTeam] = matches[matchIndex];
          // Anchor the first match to day 0 to break day-permutation
          // symmetry, which only exists while the days are the same size.
          const isAnchored = matchIndex === 0 && areDaysInterchangeable;

          const feasibleDays = (isAnchored ? [0] : allDays).filter(day => {
            if (numMatchesByDay[day] === capacities[day]) {
              return false;
            }
            for (const team of matches[matchIndex]) {
              // a group mate already on this day breaks the separation
              const mates = groupMatesByTeam.get(team);
              if (mates?.some(mate => dayByTeam[mate] === day)) {
                return false;
              }
              // adding this team must not push more days to the per-country
              // cap than the allowance permits
              const { country } = teams[team];
              const { maxAllowed, numMaxes } = allowanceByCountry.get(country)!;
              const counts = countryTeamsByDay.get(country)!;
              let numAtMax = 0;
              let numUsedDays = 0;
              let numPlacedTeams = 0;
              for (const [d, base] of counts.entries()) {
                const count = d === day ? base + 1 : base;
                if (count >= maxAllowed) {
                  ++numAtMax;
                }
                if (count > 0) {
                  ++numUsedDays;
                }
                numPlacedTeams += count;
              }
              if (numAtMax > numMaxes) {
                return false;
              }
              // Each club still to be placed opens at most one more day,
              // so drop this day as soon as the ones left cannot get the
              // country to the days it owes.
              const coverage = coverageByCountry.get(country);
              if (
                coverage &&
                numUsedDays +
                  Math.min(
                    coverage.numTeams - numPlacedTeams,
                    allDays.length - numUsedDays,
                  ) <
                  coverage.minDays
              ) {
                return false;
              }
            }
            return true;
          });

          // Prefer days where this match's countries are least represented
          // (an empty day is strongly preferred), then the emptier day.
          const firstCounts = countryTeamsByDay.get(teams[firstTeam].country)!;
          const secondCounts = countryTeamsByDay.get(
            teams[secondTeam].country,
          )!;
          const preferredDays = isAnchored
            ? feasibleDays
            : orderBy(feasibleDays, [
                day => {
                  const first =
                    firstCounts[day] === 0 ? -1_000_000 : firstCounts[day];
                  const second =
                    secondCounts[day] === 0 ? -1_000_000 : secondCounts[day];
                  return first + second;
                },
                day => numMatchesByDay[day],
              ]);

          return preferredDays.map(day => [matchIndex, day] as const);
        },

        apply: ([matchIndex, day]) => {
          const [firstTeam, secondTeam] = matches[matchIndex];
          scheduleDay[matchIndex] = day;
          ++numMatchesByDay[day];
          dayByTeam[firstTeam] = day;
          dayByTeam[secondTeam] = day;
          ++countryTeamsByDay.get(teams[firstTeam].country)![day];
          ++countryTeamsByDay.get(teams[secondTeam].country)![day];
          ++numPlaced;
        },

        undo: ([matchIndex, day]) => {
          const [firstTeam, secondTeam] = matches[matchIndex];
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
        return scheduleDay;
      }
    }
  }

  throw new Error('No solution found after all');
};

const splitMatchday = ({
  matchday,
  teams,
  dayCapacities,
  openingMatch,
}: {
  matchday: readonly Match[];
  teams: readonly Team[];
  dayCapacities: readonly number[];
  openingMatch: Match | undefined;
}) => {
  const capacities = openingMatch ? dayCapacities.slice(1) : dayCapacities;
  const numDays = capacities.length;
  const areDaysInterchangeable = capacities.every(
    capacity => capacity === capacities[0],
  );

  const matchesToSplit = openingMatch
    ? matchday.filter(match => match !== openingMatch)
    : matchday;

  // Grouped over the clubs still to be placed rather than the whole field:
  // the opening match is already on a day of its own,
  // so letting its two clubs keep a share of the remaining days' allowance
  // would buy their compatriots a slot nobody needs.
  //
  // Within a country, clubs are ordered by popularity (most first),
  // falling back to seeding position for clubs that aren't listed.
  const orderedTeamsByCountry = new Map(
    Map.groupBy(matchesToSplit.flat(), (i): UefaCountry => teams[i].country)
      .entries()
      .map(
        ([country, indices]) =>
          [
            country,
            orderBy(indices, i => popularityRank(teams[i], i)),
          ] as const,
      ),
  );

  // The most popular clubs from a country must play on different days:
  // chunk each country's popularity order
  // into groups the size of the day count,
  // so the top `numDays` clubs are split across the days,
  // the next batch too & so on.
  // For a two-day matchday this is exactly the TV pairing (groups of two).
  const separationGroups = orderedTeamsByCountry
    .values()
    // A country with no more clubs than days has a single tuple holding all
    // of them, which is what its coverage below already asks for.
    .filter(indices => indices.length > numDays)
    .flatMap(indices => chunk(indices, numDays))
    .filter(group => group.length > 1)
    .toArray();

  // Whatever else has to give, a country is spread over as many days as it
  // has the clubs to fill: a day each while it has no more clubs than days,
  // every day once it has more.
  const coverages = orderedTeamsByCountry
    .entries()
    .filter(([, indices]) => indices.length > 1)
    .map(([country, indices]): Coverage => ({
      country,
      numTeams: indices.length,
      minDays: Math.min(indices.length, numDays),
    }))
    .toArray();

  const allowanceByCountry = new Map(
    orderedTeamsByCountry.entries().map(([country, indices]) => {
      const quotient = Math.floor(indices.length / numDays);
      const remainder = indices.length % numDays;
      return [
        country,
        remainder === 0
          ? {
              maxAllowed: quotient,
              numMaxes: numDays,
            }
          : {
              maxAllowed: quotient + 1,
              numMaxes: remainder,
            },
      ] as const;
    }),
  );

  const dayAssignment = findDayAssignment({
    matches: matchesToSplit,
    teams,
    capacities,
    countries: orderedTeamsByCountry.keys().toArray(),
    coverages,
    separationGroups,
    allowanceByCountry,
    areDaysInterchangeable,
  });

  const days = capacities.map(() => [] as Match[]);
  for (const [matchIndex, day] of dayAssignment.entries()) {
    days[day].push(matchesToSplit[matchIndex]);
  }

  return openingMatch ? [[openingMatch], ...days] : days;
};

export default ({
  matchdays,
  tournament,
  season,
  matchdaySize,
  teams,
  titleHolder,
}: {
  matchdays: readonly (readonly Match[])[];
  tournament: Tournament;
  season: number;
  matchdaySize: number;
  teams: readonly Team[];
  titleHolder?: string;
}) =>
  matchdays.map((matchday, matchdayIndex) =>
    splitMatchday({
      matchday,
      teams,
      dayCapacities: getDayCapacities({
        tournament,
        season,
        matchdayIndex,
        numMatchdays: matchdays.length,
        matchdaySize,
      }),
      openingMatch:
        hasOpeningMatch(tournament, season) && matchdayIndex === 0
          ? findOpeningMatch({
              matchday,
              teams,
              titleHolder,
            })
          : undefined,
    }),
  );
