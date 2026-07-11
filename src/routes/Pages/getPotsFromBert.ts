import { memoize } from 'lodash';

import type Tournament from '#model/Tournament';
import type Stage from '#model/Stage';
import type GsTeam from '#model/team/GsTeam';
import parseGS from '#model/parsePotsData/gs';
import parseKo from '#model/parsePotsData/ko';

async function getPotsFromBert(
  tournament: Tournament,
  stage: Stage,
  season: number,
) {
  const data = await import(
    /* webpackChunkName: "pots/[request]" */
    `../../data/${tournament}/${stage}/${season}/pots.json`
  ).then(mod => mod.default);

  if (stage === 'ko') {
    return {
      pots: parseKo(data),
      pairings: [],
    };
  }

  const pots = parseGS(data);

  // TV pairings are derived while parsing (each team's `pairing`); collect them
  // into a flat list, each pair once.
  const seen = new Set<GsTeam>();
  const pairings: (readonly [GsTeam, GsTeam])[] = [];
  for (const team of pots.flat()) {
    const partner = team.pairing;
    if (partner && !seen.has(team) && !seen.has(partner)) {
      pairings.push([team, partner]);
      seen.add(team);
      seen.add(partner);
    }
  }

  return {
    pots,
    pairings,
  };
}

export default memoize(getPotsFromBert, (...args) => args.join(':'));
