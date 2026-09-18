import { chunk, difference, orderBy, range, shuffle } from 'lodash';

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
  separationGroups,
  allowanceByCountry,
  areDaysInterchangeable,
}: {
  matches: readonly Match[];
  teams: readonly Team[];
  capacities: readonly number[];
  countries: readonly UefaCountry[];
  separationGroups: readonly (readonly number[])[];
  allowanceByCountry: ReadonlyMap<UefaCountry, Allowance>;
  areDaysInterchangeable: boolean;
}) => {
  const allDays = range(capacities.length);

  // Relax the popularity separation one group at a time (least popular
  // first) until the matchday can be split, dropping every group if need be.
  for (
    let numEliminatedGroups = 0;
    numEliminatedGroups <= separationGroups.length;
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

          // Prefer days where this match's countries are least represented
          // (an empty day is strongly preferred), random tie-breaking.
          const firstCounts = countryTeamsByDay.get(teams[firstTeam].country)!;
          const secondCounts = countryTeamsByDay.get(
            teams[secondTeam].country,
          )!;
          const preferredDays = isAnchored
            ? feasibleDays
            : orderBy(shuffle(feasibleDays), day => {
                const first =
                  firstCounts[day] === 0 ? -1_000_000 : firstCounts[day];
                const second =
                  secondCounts[day] === 0 ? -1_000_000 : secondCounts[day];
                return first + second;
              });

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
    .flatMap(indices => chunk(indices, numDays))
    .filter(group => group.length > 1)
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
