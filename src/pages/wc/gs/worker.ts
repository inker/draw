import memoizeOne from 'memoize-one'
import { firstPossibleGroup } from '@draws/engine'
import { orderBy } from 'lodash'

import getPredicate from 'engine/predicates/wc'
import Team from 'model/team/NationalTeam'
import type { GsWorkerData } from 'model/WorkerData'

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

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (e: MessageEvent<GsWorkerData<Team>>) => {
  const {
    messageId,
    data: {
      season,
      pots,
      groups,
      selectedTeam,
    },
  } = e.data

  const teams = [
    selectedTeam,
    ...pots.flat(),
    ...groups.flat(),
  ]
  const predicate = getPredicateMemoized(season, teams)
  const pickedGroup = firstPossibleGroup(pots, groups, selectedTeam, predicate)

  postMessage({
    messageId,
    data: {
      pickedGroup,
    },
  })
})
