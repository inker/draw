import memoizeOne from 'memoize-one'
import { orderBy } from 'lodash'

import { firstPossibleGroup } from 'engine/backtracking/gs'
import getPredicate from 'engine/predicates/wc'
import type Team from 'model/team/NationalTeam'
import {
  type GsWorkerData,
} from 'model/WorkerData'
import exposeWorker from 'utils/worker/expose'

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

exposeWorker((data: GsWorkerData<Team>) => {
  const {
    season,
    pots,
    groups,
    selectedTeam,
  } = data

  const teams = [
    selectedTeam,
    ...pots.flat(),
    ...groups.flat(),
  ]
  const predicate = getPredicateMemoized(season, teams)
  const pickedGroup = firstPossibleGroup(pots, groups, selectedTeam, predicate)

  return {
    pickedGroup,
  }
})
