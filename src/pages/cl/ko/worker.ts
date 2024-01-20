import memoizeOne from 'memoize-one'

import { allPossibleGroups } from '#engine/dfs/gs'
import getPredicate from '#engine/predicates/uefa/ko'
import type Team from '#model/team/KnockoutTeam'
import {
  type GsWorkerDataSerialized,
  deserializeGsWorkerData,
} from '#model/WorkerData'
import exposeWorker, { type ExposedFuncType } from '#utils/worker/expose'

type GetPredicateParams = Parameters<typeof getPredicate>

const serializeArgs = ([year]: GetPredicateParams) =>
  JSON.stringify({
    year,
  })

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs)

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc)

const func = (data: GsWorkerDataSerialized<Team>) => {
  const { season, pots, groups, selectedTeam } = deserializeGsWorkerData(data)

  const predicate = getPredicateMemoized(season)
  return allPossibleGroups({
    pots,
    groups,
    picked: selectedTeam,
    predicate,
  })
}

export type Func = ExposedFuncType<typeof func>

exposeWorker(func)
