import memoizeOne from 'memoize-one'

import { getPossiblePairings } from 'engine/backtracking/ko'
import getPredicate from 'engine/predicates/uefa/ko'
import type Team from 'model/team/KnockoutTeam'
import {
  type KoWorkerData,
  type WorkerMessage,
} from 'model/WorkerData'

type GetPredicateParams = Parameters<typeof getPredicate>

const serializeArgs = ([year]: GetPredicateParams) =>
  JSON.stringify({
    year,
  })

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs)

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc)

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (e: MessageEvent<WorkerMessage<KoWorkerData<Team>>>) => {
  const {
    messageId,
    data: {
      season,
      pots,
      matchups,
    },
  } = e.data

  const predicate = getPredicateMemoized(season)
  const possiblePairings = getPossiblePairings(pots, matchups, predicate)

  postMessage({
    messageId,
    data: {
      possiblePairings,
    },
  })
})
