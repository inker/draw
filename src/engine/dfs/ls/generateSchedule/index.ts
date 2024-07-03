import { keyBy, uniq } from 'lodash';

import getFirstSuitableMatchday from './getFirstSuitableMatchday.wrapper';

export default async function* generateSchedule<T extends { id: string }>({
  matchdaySize,
  allGames: allGamesWithIds,
  currentSchedule: currentScheduleWithIds,
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

  const currentSchedule: Record<`${number}:${number}`, number> = {};
  for (const [matchdayIndex, matchday] of currentScheduleWithIds.entries()) {
    for (const [h, a] of matchday) {
      const homeIndex = indexByTeamId.get(h.id)!;
      const awayIndex = indexByTeamId.get(a.id)!;
      currentSchedule[`${homeIndex}:${awayIndex}`] = matchdayIndex;
    }
  }

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

  for (const [i, match] of allGamesUnordered.entries()) {
    // eslint-disable-next-line no-await-in-loop
    const result = await getFirstSuitableMatchday({
      // @ts-expect-error Fix this later
      teams: allTeams,
      matchdaySize,
      allGames: allGamesUnordered,
      currentSchedule,
      matchIndex: i,
      signal,
    });
    currentSchedule[`${match[0]}:${match[1]}`] = result.pickedMatchday;

    const homeTeam = teamById[allTeamIds[match[0]]];
    const awayTeam = teamById[allTeamIds[match[1]]];
    const originalMatch = allGamesWithIds.find(
      m => m[0].id === homeTeam.id && m[1].id === awayTeam.id,
    )!;

    const solutionSchedule = result.matchdays.map(md =>
      md.map(([h, a]) => {
        const ht = teamById[allTeamIds[h]];
        const at = teamById[allTeamIds[a]];
        return allGamesWithIds.find(
          mi => mi[0].id === ht.id && mi[1].id === at.id,
        )!;
      }),
    );

    yield {
      match: originalMatch,
      matchday: result.pickedMatchday,
      solutionSchedule,
    };
  }
}
