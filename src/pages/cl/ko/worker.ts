import memoizeOne from 'memoize-one'

import { getPossiblePairings } from 'engine/backtracking/ko'
import getPredicate from 'engine/predicates/uefa/ko'
import type Team from 'model/team/KnockoutTeam'
import {
  type KoWorkerDataSerialized,
  deserializeKoWorkerData,
} from 'model/WorkerData'
import exposeWorker, { type ExposedFuncType } from 'utils/worker/expose'

type GetPredicateParams = Parameters<typeof getPredicate>

const serializeArgs = ([year]: GetPredicateParams) =>
  JSON.stringify({
    year,
  })

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs)

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc)

const func = (data: KoWorkerDataSerialized<Team>) => {
  const { season, pots, matchups } = deserializeKoWorkerData(data)

  const predicate = getPredicateMemoized(season)
  return getPossiblePairings({
    pots,
    matchups,
    predicate,
  })
}

export type Func = ExposedFuncType<typeof func>

exposeWorker(func)
