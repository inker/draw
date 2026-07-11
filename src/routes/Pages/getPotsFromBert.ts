import { memoize } from 'lodash';

import type Tournament from '#model/Tournament';
import type Stage from '#model/Stage';
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

  const pots = stage === 'ko' ? parseKo(data) : parseGS(data);

  return {
    pots,
  };
}

export default memoize(getPotsFromBert, (...args) => args.join(':'));
