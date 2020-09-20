import memoizeOne from 'memoize-one'

import getPossiblePairings from 'engine/predicates/uefa/getPossiblePairings'
import getPredicate from 'engine/predicates/uefa/ko'
import Team from 'model/team/KnockoutTeam'
import type { KoWorkerData } from 'model/types'

type GetPredicateParams = Parameters<typeof getPredicate>

const serializeArgs = ([year]: GetPredicateParams) =>
  JSON.stringify({
    year,
  })

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs)

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc)

// eslint-disable-next-line no-restricted-globals
addEventListener('message', e => {
  const {
    messageId,
    data: {
      season,
      pots,
      matchups,
    },
  } = e.data as KoWorkerData<Team>

  const predicate = getPredicateMemoized(season)
  const possiblePairings = getPossiblePairings(pots, matchups, predicate)

  postMessage({
    messageId,
    data: {
      possiblePairings,
    },
  })
})
