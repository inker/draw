import memoizeOne from 'memoize-one'

import { firstPossibleGroup } from '#engine/dfs/gs'
import getPredicate from '#engine/predicates/uefa/gs'
import type Team from '#model/team/GsTeam'
import {
  type GsWorkerDataSerialized,
  deserializeGsWorkerData,
} from '#model/WorkerData'
import exposeWorker, { type ExposedFuncType } from '#utils/worker/expose'

type GetPredicateParams = Parameters<typeof getPredicate>

const serializeArgs = ([year, groupSize]: GetPredicateParams) =>
  JSON.stringify({
    year,
    groupSize,
  })

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs)

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc)

const func = (data: GsWorkerDataSerialized<Team>) => {
  const { season, pots, groups, selectedTeam } = deserializeGsWorkerData(data)

  const predicate = getPredicateMemoized(season, pots.length)
  return firstPossibleGroup({
    pots,
    groups,
    picked: selectedTeam,
    predicate,
  })
}

export type Func = ExposedFuncType<typeof func>

exposeWorker(func)
