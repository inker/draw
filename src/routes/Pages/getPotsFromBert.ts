import { memoize } from 'lodash'

import type Tournament from 'model/Tournament'
import type Stage from 'model/Stage'

import getPairings from 'model/getPairings'
import parseGS from 'model/parsePotsData/gs'
import parseKo from 'model/parsePotsData/ko'

async function getPotsFromBert(tournament: Tournament, stage: Stage, season: number) {
  const [data, pairings] = await Promise.all([
    import(
      /* webpackChunkName: "pots/[request]" */
      `data/${tournament}/${stage}/${season}/pots.json`
    ).then(mod => mod.default),
    getPairings(season, tournament),
  ])

  return stage === 'ko'
    ? parseKo(data)
    : parseGS(data, pairings)
}

export default memoize(getPotsFromBert, (...args) => args.join(':'))
