import pMemoize from 'p-memoize';

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

// p-memoize does not cache a rejected promise,
// so a season that failed to load can be retried instead of replaying the same error until a reload
export default pMemoize(getPotsFromBert, {
  cacheKey: args => args.join(':'),
});
