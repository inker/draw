import memoizeOne from 'memoize-one'

import { firstPossibleGroup } from 'engine/backtracking/gs'
import getPredicate from 'engine/predicates/uefa/gs'
import type Team from 'model/team/GsTeam'
import {
  type GsWorkerData,
  type WorkerMessage,
} from 'model/WorkerData'

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
addEventListener('message', (e: MessageEvent<WorkerMessage<GsWorkerData<Team>>>) => {
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
