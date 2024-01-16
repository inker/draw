import { memoize } from 'lodash'

import parseWc from '#model/parsePotsData/wc'

async function getWcPots(season: number) {
  const txt = await import(
    /* webpackChunkName: "wc-data-[request]" */ `data/wc-${season}.txt`
  )
  const [ths, rest] = (txt.default as string)
    .trim()
    .split('\n\n')
    .map(line => line.trim().split('\n'))
  return parseWc(ths, rest) // TODO: only works with 'default' right now
}

export default memoize(getWcPots)
