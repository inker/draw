import { chunk, difference, orderBy, range } from "lodash";

import { type UefaCountry } from "#model/types";
import type Tournament from "#model/Tournament";
import popularityRank from "#model/popularityRank";
import { findFirstSolutionMutable } from "#utils/backtrack";
import combine from "#utils/combine";

interface Team {
  readonly name: string;
  readonly country: UefaCountry;
}

/**
 * Home team index first
 */
type Match = readonly [number, number];

/**
 * A country that has to spread its clubs over as many of the matchday's days
 * as it has the clubs to fill, & how many clubs that is
 */
type Coverage = readonly [UefaCountry, number];

/**
 * 2 for a game between pot-1 clubs,
 * 1 for any other game within pots 1-2
 * & 0 otherwise.
 * UEFA spreads the big ones over the Champions League's days
 * more evenly than chance would.
 */
type BigGameTier = 0 | 1 | 2;

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
  tournament === "cl" && season >= firstSeasonWithOpeningMatch;

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
  if (tournament === "cl" && matchdayIndex === 0) {
    if (!hasOpeningMatch(tournament, season)) {
      return [matchdaySize / 3, matchdaySize / 3, matchdaySize / 3];
    }
    // 1-9-8 for a full Champions League matchday
    const rest = matchdaySize - 1;
    return [1, Math.ceil(rest / 2), Math.floor(rest / 2)];
  }

  return matchdayIndex === numMatchdays - 1
    ? [matchdaySize]
    : [matchdaySize / 2, matchdaySize / 2];
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
      "No title holder is on record for this season, so there is no opening match to schedule",
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
  bigGameTiers,
  areDaysInterchangeable,
}: {
  matches: readonly Match[];
  teams: readonly Team[];
  capacities: readonly number[];
  countries: readonly UefaCountry[];
  coverages: readonly Coverage[];
  separationGroups: readonly (readonly number[])[];
  bigGameTiers: readonly BigGameTier[];
  areDaysInterchangeable: boolean;
}) => {
  const allDays = range(capacities.length);

  // Every popularity tuple goes before a single country's coverage does:
  // which of a country's clubs are split over the days
  // matters less than the country reaching every day it has the clubs for.
  for (const remainingCoverages of relaxations(coverages)) {
    const numTeamsByCountry = new Map(remainingCoverages);

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
      // games of each tier on each day, indexed by day & then tier
      const numBigGamesByDay = allDays.map(() => [0, 0, 0]);
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
              const { country } = teams[team];
              const numTeams = numTeamsByCountry.get(country);
              if (numTeams === undefined) {
                continue;
              }
              const counts = countryTeamsByDay.get(country)!;
              let numUsedDays = 0;
              let numPlacedTeams = 0;
              for (const [d, base] of counts.entries()) {
                const count = d === day ? base + 1 : base;
                if (count > 0) {
                  ++numUsedDays;
                }
                numPlacedTeams += count;
              }
              // Each club left to place opens at most one more day,
              // so give up on this day
              // as soon as fewer are left than the days the country still owes.
              const minDays = Math.min(numTeams, allDays.length);
              if (numTeams - numPlacedTeams < minDays - numUsedDays) {
                return false;
              }
            }
            return true;
          });

          // Prefer days where this match's countries are least represented
          // (an empty day is strongly preferred),
          // then the day with the fewest big games of this one's tier or above,
          // then the emptier day.
          const tier = bigGameTiers[matchIndex];
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
                day => (tier === 2 ? numBigGamesByDay[day][2] : 0),
                day =>
                  tier === 0
                    ? 0
                    : numBigGamesByDay[day][1] + numBigGamesByDay[day][2],
                day => numMatchesByDay[day],
              ]);

          return preferredDays.map(day => [matchIndex, day] as const);
        },

        apply: ([matchIndex, day]) => {
          const [firstTeam, secondTeam] = matches[matchIndex];
          scheduleDay[matchIndex] = day;
          ++numMatchesByDay[day];
          ++numBigGamesByDay[day][bigGameTiers[matchIndex]];
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
          --numBigGamesByDay[day][bigGameTiers[matchIndex]];
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

  throw new Error("No solution found after all");
};

const splitMatchday = ({
  matchday,
  teams,
  dayCapacities,
  openingMatch,
  getBigGameTier,
}: {
  matchday: readonly Match[];
  teams: readonly Team[];
  dayCapacities: readonly number[];
  openingMatch: Match | undefined;
  getBigGameTier: (match: Match) => BigGameTier;
}) => {
  const capacities = openingMatch ? dayCapacities.slice(1) : dayCapacities;
  const numDays = capacities.length;
  const areDaysInterchangeable = capacities.every(
    capacity => capacity === capacities[0],
  );

  // Big games are placed first, while every day is still open to them.
  // Placed in random order, most only got the day the other rules left,
  // which barely spread them more evenly than ignoring them did.
  // The sort is stable, so the shuffle still decides the order within a tier.
  const matchesToSplit = orderBy(
    openingMatch ? matchday.filter(match => match !== openingMatch) : matchday,
    getBigGameTier,
    "desc",
  );

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
    .map(([country, indices]): Coverage => [country, indices.length])
    .toArray();

  const dayAssignment = findDayAssignment({
    matches: matchesToSplit,
    teams,
    capacities,
    countries: orderedTeamsByCountry.keys().toArray(),
    coverages,
    separationGroups,
    bigGameTiers: matchesToSplit.map(getBigGameTier),
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
  potSize,
  titleHolder,
}: {
  matchdays: readonly (readonly Match[])[];
  tournament: Tournament;
  season: number;
  matchdaySize: number;
  /**
   * The pots are laid out one after another in `teams`
   */
  teams: readonly Team[];
  potSize: number;
  titleHolder?: string;
}) => {
  // The higher index of the two is the club from the lower pot
  const getBigGameTier = (match: Match): BigGameTier => {
    if (tournament !== "cl") {
      return 0;
    }
    const lowerPot = Math.floor(Math.max(...match) / potSize);
    return lowerPot === 0 ? 2 : lowerPot === 1 ? 1 : 0;
  };

  return matchdays.map((matchday, matchdayIndex) =>
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
      getBigGameTier,
    }),
  );
};
