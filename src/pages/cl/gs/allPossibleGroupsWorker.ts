import memoizeOne from 'memoize-one'

import { allPossibleGroups } from 'engine/backtracking/gs'
import getPredicate from 'engine/predicates/uefa/gs'
import type Team from 'model/team/GsTeam'
import {
  type GsWorkerData,
} from 'model/WorkerData'
import exposeWorker from 'utils/worker/expose'

type GetPredicateParams = Parameters<typeof getPredicate>

const serializeArgs = ([year, groupSize]: GetPredicateParams) =>
  JSON.stringify({
    year,
    groupSize,
  })

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs)

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc)

exposeWorker((data: GsWorkerData<Team>) => {
  const {
    season,
    pots,
    groups,
    selectedTeam,
  } = data

  const predicate = getPredicateMemoized(season, pots.length)
  const possibleGroups = allPossibleGroups(pots, groups, selectedTeam, predicate)

  return {
    possibleGroups,
  }
})
