import { keyBy, uniq } from 'lodash';

import getFirstSuitableMatchday from './getFirstSuitableMatchday.wrapper';

export default async function* generateSchedule<T extends { id: string }>({
  matchdaySize,
  allGames: allGamesWithIds,
  currentSchedule: foobar,
}: {
  matchdaySize: number;
  allGames: readonly (readonly [T, T])[];
  currentSchedule: readonly (readonly (readonly [T, T])[])[];
}) {
  const allTeams = allGamesWithIds.flat();
  const teamById = keyBy(allTeams, team => team.id);
  const allTeamIds = uniq(allTeams.map(team => team.id));
  const indexByTeamId = new Map(allTeamIds.map((id, i) => [id, i] as const));

  const currentSchedule: Record<`${number}:${number}`, number> = {};
  for (const [matchdayIndex, matchday] of foobar.entries()) {
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
      matchdaySize,
      allGames: allGamesUnordered,
      currentSchedule,
      matchIndex: i,
    });
    console.log('for match', match, 'picked', result.pickedMatchday);
    currentSchedule[`${match[0]}:${match[1]}`] = result.pickedMatchday;

    const homeTeam = teamById[allTeamIds[match[0]]];
    const awayTeam = teamById[allTeamIds[match[1]]];
    const originalMatch = allGamesWithIds.find(
      m => m[0].id === homeTeam.id && m[1].id === awayTeam.id,
    )!;

    const haha = result.matchdays.map(md =>
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
      solutionSchedule: haha,
    };
  }
}
