import { getSeasonFacts } from '#data/seasonFacts';
import coldCountries from '#engine/predicates/uefa/utils/coldCountries';
import { type UefaCountry } from '#model/types';
import type Tournament from '#model/Tournament';
import { type PrngGenerator } from '#utils/prng/generator';
import prngFloat from '#utils/prng/float';
import prngShuffle from '#utils/prng/shuffle';
import prngShuffleAll from '#utils/prng/shuffleAll';
import assertIndicesInRange from '#utils/assertIndicesInRange';

import assignGamesToMatchdays from './assignGamesToMatchdays.wrapper';
import { type Ban } from './homeAwayPatterns';
import splitMatchdaysIntoDays, {
  hasOpeningMatch,
} from './splitMatchdaysIntoDays';

interface Team {
  readonly name: string;
  readonly country: UefaCountry;
}

/**
 * Teams are passed & returned as indices into `teams`
 */
export default async function generateSchedule({
  season,
  tournament,
  matchdaySize,
  teams,
  allGames,
  getNumWorkers,
  prngGenerator,
  signal,
}: {
  season: number;
  tournament: Tournament;
  matchdaySize: number;
  teams: readonly Team[];
  allGames: readonly (readonly [number, number])[];
  getNumWorkers: () => number;
  prngGenerator: PrngGenerator;
  signal?: AbortSignal;
}) {
  assertIndicesInRange(allGames.flat(), teams.length, 'allGames');

  const { titleHolder } = getSeasonFacts(tournament, season) ?? {};

  const lastMatchday = allGames.length / matchdaySize - 1;
  const isFromColdCountry = coldCountries(season);
  const bans: Ban[] = [];
  for (const [teamIndex, team] of teams.entries()) {
    if (isFromColdCountry(team)) {
      bans.push({
        teamIndex,
        matchday: lastMatchday,
        location: 'home',
      });
    }
  }

  // The opener is pinned here rather than after the fact:
  // whether the holders are at home on the first matchday is decided by this solver,
  // & splitMatchdaysIntoDays can only carve out a game that is already there.
  const openingHostTeamIndex = hasOpeningMatch(tournament, season)
    ? teams.findIndex(team => team.name === titleHolder)
    : -1;
  if (openingHostTeamIndex !== -1) {
    bans.push({
      teamIndex: openingHostTeamIndex,
      matchday: 0,
      location: 'away',
    });
  }

  const allGamesShuffled = await prngShuffle({
    collection: allGames,
    prngGenerator,
  });

  const randomSeed = await prngFloat(prngGenerator);

  const result = await assignGamesToMatchdays({
    teams,
    matchdaySize,
    allGames: allGamesShuffled,
    bans,
    randomSeed,
    getNumWorkers,
    signal,
  });

  const shuffledMatchdaysSource = await prngShuffleAll({
    collections: result,
    prngGenerator,
  });

  const matchdays = splitMatchdaysIntoDays({
    matchdays: shuffledMatchdaysSource,
    tournament,
    season,
    matchdaySize,
    teams,
    titleHolder,
  });

  const shuffledMatchdaysResult: (readonly (readonly [number, number])[])[][] =
    [];
  for (const [matchdayIndex, md] of matchdays.entries()) {
    const numFixedDays =
      hasOpeningMatch(tournament, season) && matchdayIndex === 0 ? 1 : 0;
    const swappableDays = md.slice(numFixedDays);
    const firstDayLength = swappableDays[0].length;

    // Days of different sizes sit at fixed points in the calendar,
    // so only same-sized ones can be swapped round.
    const areDaysInterchangeable = swappableDays.every(
      day => day.length === firstDayLength,
    );

    let orderedDays = swappableDays;
    if (areDaysInterchangeable) {
      // eslint-disable-next-line no-await-in-loop
      orderedDays = await prngShuffle({
        collection: swappableDays,
        prngGenerator,
      });
    }

    // eslint-disable-next-line no-await-in-loop
    const shuffledDays = await prngShuffleAll({
      collections: [...md.slice(0, numFixedDays), ...orderedDays],
      prngGenerator,
    });
    shuffledMatchdaysResult.push(shuffledDays);
  }

  return {
    solutionSchedule: shuffledMatchdaysResult,
  };
}
