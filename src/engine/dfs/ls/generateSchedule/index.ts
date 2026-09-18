import { keyBy, uniq } from 'lodash';

import { getSeasonFacts } from '#data/seasonFacts';
import { type UefaCountry } from '#model/types';
import type Tournament from '#model/Tournament';

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
  signal,
}: {
  season: number;
  tournament: Tournament;
  matchdaySize: number;
  allGames: readonly (readonly [T, T])[];
  getNumWorkers: () => number;
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

  const result = await assignGamesToMatchdays({
    season,
    teams: allTeams,
    matchdaySize,
    allGames: allGamesUnordered,
    openingHostTeamIndex,
    getNumWorkers,
    signal,
  });

  const matchdays = splitMatchdaysIntoDays({
    matchdays: result,
    tournament,
    season,
    matchdaySize,
    teams: allTeams,
    titleHolder,
  });

  const solutionSchedule = matchdays.map(md =>
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
