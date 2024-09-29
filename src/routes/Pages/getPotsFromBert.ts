import { memoize } from 'lodash';

import type Tournament from '#model/Tournament';
import type Stage from '#model/Stage';
import getPairings from '#model/getPairings';
import parseGS from '#model/parsePotsData/gs';
import parseKo from '#model/parsePotsData/ko';

async function getPotsFromBert(
  tournament: Tournament,
  stage: Stage,
  season: number,
) {
  const [data, pairings] = await Promise.all([
    import(
      /* webpackChunkName: "pots/[request]" */
      `../../data/${tournament}/${stage}/${season}/pots.json`
    ).then(mod => mod.default),
    getPairings(season, tournament),
  ]);

  const parsedPots = stage === 'ko' ? parseKo(data) : parseGS(data, pairings);

  const flatTeams = parsedPots.flat();
  const parsedPairings = pairings.map(([a, b]) => {
    const firstTeam = flatTeams.find(t => t.name === a);
    if (!firstTeam) {
      throw new Error(`Team not found: ${a}`);
    }
    const secondTeam = flatTeams.find(t => t.name === b);
    if (!secondTeam) {
      throw new Error(`Team not found: ${b}`);
    }
    return [firstTeam, secondTeam] as const;
  });

  return {
    pots: parsedPots,
    pairings: parsedPairings,
  };
}

export default memoize(getPotsFromBert, (...args) => args.join(':'));
