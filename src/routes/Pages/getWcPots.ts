import { memoize } from 'lodash';

import parseWc from '#model/parsePotsData/wc';

async function getWcPots(season: number) {
  const txt = await import(
    /* webpackChunkName: "wc-data-[request]" */ `../../data/wc-${season}.txt`
  );
  const forcedGroupMap: Record<string, number> = {};
  const [ths, rest] = (txt.default as string)
    .trim()
    .split('\n\n')
    .map(line =>
      line
        .trim()
        .split('\n')
        .map(l => {
          const match = /^(.+?)\s-\sGROUP\s(\d+)$/.exec(l);
          if (!match) {
            return l;
          }
          forcedGroupMap[match[1]] = +match[2];
          return match[1];
        }),
    );
  const parsedPots = parseWc(ths, rest, season, forcedGroupMap); // TODO: only works with 'default' right now
  return {
    pots: parsedPots,
  };
}

export default memoize(getWcPots);
