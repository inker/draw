import { keyBy, uniq } from 'lodash';

import getFirstSuitableMatchday from './getFirstSuitableMatchday.wrapper';

interface Team {
  readonly id: string;
  readonly name: string;
}

export default async function generateSchedule<T extends Team>({
  matchdaySize,
  allGames: allGamesWithIds,
  signal,
}: {
  matchdaySize: number;
  allGames: readonly (readonly [T, T])[];
  currentSchedule: readonly (readonly (readonly [T, T])[])[];
  signal?: AbortSignal;
}) {
  const allNonUniqueTeams = allGamesWithIds.flat();
  const teamById = keyBy(allNonUniqueTeams, team => team.id);
  const allTeamIds = uniq(allNonUniqueTeams.map(team => team.id));
  const allTeams = allTeamIds.map(
    id => allNonUniqueTeams.find(item => item.id === id)!,
  );
  const indexByTeamId = new Map(allTeamIds.map((id, i) => [id, i] as const));

  const allGamesUnordered: (readonly [number, number])[] = [];
  for (const [h, a] of allGamesWithIds) {
    const homeIndex = indexByTeamId.get(h.id)!;
    const awayIndex = indexByTeamId.get(a.id)!;
    allGamesUnordered.push([homeIndex, awayIndex]);
  }

  // const allGames = orderBy(allGamesUnordered, [
  //   m => Math.min(...m),
  //   m => Math.max(...m),
  // ]);

  const result = await getFirstSuitableMatchday({
    teams: allTeams,
    matchdaySize,
    allGames: allGamesUnordered,
    signal,
  });

  const solutionSchedule = result.matchdays.map(md =>
    md.map(([h, a]) => {
      const ht = teamById[allTeamIds[h]];
      const at = teamById[allTeamIds[a]];
      return allGamesWithIds.find(
        mi => mi[0].id === ht.id && mi[1].id === at.id,
      )!;
    }),
  );

  return {
    solutionSchedule,
  };
}
