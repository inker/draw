import memoizeOne from 'memoize-one'
import { orderBy } from 'lodash'

import { firstPossibleGroup } from '#engine/backtracking/gs'
import getPredicate from '#engine/predicates/wc'
import type Team from '#model/team/NationalTeam'
import {
  type GsWorkerDataSerialized,
  deserializeGsWorkerData,
} from '#model/WorkerData'
import exposeWorker, { type ExposedFuncType } from '#utils/worker/expose'

type GetPredicateParams = Parameters<typeof getPredicate>

function serializeArgs([year, teams]: GetPredicateParams) {
  const orderedTeams = orderBy(teams, team => team.id)
  return JSON.stringify({
    year,
    teams: orderedTeams,
  })
}

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs)

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc)

const func = (data: GsWorkerDataSerialized<Team>) => {
  const { season, pots, groups, selectedTeam } = deserializeGsWorkerData(data)

  const teams = [selectedTeam, ...pots.flat(), ...groups.flat()]
  const predicate = getPredicateMemoized(season, teams)
  return firstPossibleGroup({
    pots,
    groups,
    picked: selectedTeam,
    predicate,
  })
}

export type Func = ExposedFuncType<typeof func>

exposeWorker(func)
