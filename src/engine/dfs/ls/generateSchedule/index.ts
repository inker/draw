import { keyBy, uniq } from 'lodash';

import { type UefaCountry } from '#model/types';
import type Tournament from '#model/Tournament';

import assignGamesToMatchdays from './assignGamesToMatchdays.wrapper';
import splitMatchdaysIntoDays from './splitMatchdaysIntoDays';

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

  const result = await assignGamesToMatchdays({
    season,
    teams: allTeams,
    matchdaySize,
    allGames: allGamesUnordered,
    getNumWorkers,
    signal,
  });

  const matchdays = splitMatchdaysIntoDays({
    matchdays: result,
    tournament,
    matchdaySize,
    teams: allTeams,
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
