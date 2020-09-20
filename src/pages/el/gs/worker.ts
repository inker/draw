import memoizeOne from 'memoize-one'
import { firstPossibleGroup } from '@draws/engine'

import getPredicate from 'engine/predicates/uefa/gs'
import Team from 'model/team/GsTeam'
import type { GsWorkerData } from 'model/WorkerData'

type GetPredicateParams = Parameters<typeof getPredicate>

const serializeArgs = ([year, groupSize]: GetPredicateParams) =>
  JSON.stringify({
    year,
    groupSize,
  })

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

  const predicate = getPredicateMemoized(season, pots.length)
  const pickedGroup = firstPossibleGroup(pots, groups, selectedTeam, predicate)

  postMessage({
    messageId,
    data: {
      pickedGroup,
    },
  })
})
