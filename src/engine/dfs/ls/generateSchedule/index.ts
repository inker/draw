import { keyBy, uniq } from 'lodash';

import { getSeasonFacts } from '#data/seasonFacts';
import { type UefaCountry } from '#model/types';
import type Tournament from '#model/Tournament';
import prngFloat from '#utils/prngFloat';
import prngShuffle from '#utils/prngShuffle';

import assignGamesToMatchdays from './assignGamesToMatchdays.wrapper';
import splitMatchdaysIntoDays, {
  hasOpeningMatch,
} from './splitMatchdaysIntoDays';

interface Team {
  readonly id: string;
  readonly name: string;
  readonly country: UefaCountry;
}

export default async function generateSchedule<T extends Team>({
  season,
  tournament,
  matchdaySize,
  allGames: allGamesWithIds,
  getNumWorkers,
  prngGenerator,
  signal,
}: {
  season: number;
  tournament: Tournament;
  matchdaySize: number;
  allGames: readonly (readonly [T, T])[];
  getNumWorkers: () => number;
  prngGenerator: AsyncGenerator<ArrayBuffer, never, unknown>;
  signal?: AbortSignal;
}) {
  const allNonUniqueTeams = allGamesWithIds.flat();
  const teamById = keyBy(allNonUniqueTeams, team => team.id);
  const allTeamIds = uniq(allNonUniqueTeams.map(team => team.id));
  const allTeams = allTeamIds.map(id =>
    allNonUniqueTeams.find(item => item.id === id)!,
  );
  const indexByTeamId = new Map(allTeamIds.map((id, i) => [id, i] as const));

  const allGamesUnordered = allGamesWithIds.map(
    ([h, a]) => [indexByTeamId.get(h.id)!, indexByTeamId.get(a.id)!] as const,
  );

  const { titleHolder } = getSeasonFacts(tournament, season) ?? {};

  // The opener is pinned here rather than after the fact:
  // whether the holders are at home on the first matchday is decided by this solver,
  // & splitMatchdaysIntoDays can only carve out a game that is already there.
  const openingHostTeamIndex = hasOpeningMatch(tournament, season)
    ? allTeams.findIndex(team => team.name === titleHolder)
    : -1;

  const allGamesShuffled = await prngShuffle({
    collection: allGamesUnordered,
    prngGenerator,
  });

  const result = await assignGamesToMatchdays({
    season,
    teams: allTeams,
    matchdaySize,
    allGames: allGamesShuffled,
    openingHostTeamIndex,
    randomSeed: await prngFloat(prngGenerator),
    getNumWorkers,
    signal,
  });

  // Drawn one at a time rather than through Promise.all:
  // the generator is a single cursor,
  // so concurrent consumers would have their slices of the stream
  // decided by the order the event loop happens to resume them in.
  const shuffledMatchdaysSource: (readonly (readonly [number, number])[])[] =
    [];
  for (const md of result) {
    // eslint-disable-next-line no-await-in-loop
    const shuffled = await prngShuffle({
      collection: md,
      prngGenerator,
    });
    shuffledMatchdaysSource.push(shuffled);
  }

  const matchdays = splitMatchdaysIntoDays({
    matchdays: shuffledMatchdaysSource,
    tournament,
    season,
    matchdaySize,
    teams: allTeams,
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

    const shuffledDays: (readonly (readonly [number, number])[])[] = [];
    for (const day of [...md.slice(0, numFixedDays), ...orderedDays]) {
      // eslint-disable-next-line no-await-in-loop
      const shuffledDay = await prngShuffle({
        collection: day,
        prngGenerator,
      });
      shuffledDays.push(shuffledDay);
    }
    shuffledMatchdaysResult.push(shuffledDays);
  }

  const solutionSchedule = shuffledMatchdaysResult.map(md =>
    md.map(day =>
      day.map(([h, a]) => {
        const ht = teamById[allTeamIds[h]];
        const at = teamById[allTeamIds[a]];
        return allGamesWithIds.find(
          mi => mi[0].id === ht.id && mi[1].id === at.id,
        )!;
      }),
    ),
  );

  return {
    solutionSchedule,
  };
}
