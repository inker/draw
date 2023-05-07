import { memoize } from 'lodash'

import type Tournament from 'model/Tournament'
import type Stage from 'model/Stage'

import getPairings from 'model/getPairings'
import parseGS from 'model/parsePotsData/gs'
import parseKo from 'model/parsePotsData/ko'

async function getPotsFromBert(tournament: Tournament, stage: Stage, season: number) {
  const potsPromise = import(/* webpackChunkName: "pots/[request]" */ `data/${tournament}/${stage}/${season}/pots.json`)
  const pairings = await getPairings(season, tournament)
  const data = await potsPromise.then(mod => mod.default)

  return stage === 'ko'
    ? parseKo(data)
    : parseGS(data, pairings)
}

const resolver = (...args: Parameters<typeof getPotsFromBert>) =>
  args.join(':')

export default memoize(getPotsFromBert, resolver)
