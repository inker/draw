import memoizeOne from 'memoize-one'

import { getPossiblePairings } from 'engine/backtracking/ko'
import getPredicate from 'engine/predicates/uefa/ko'
import type Team from 'model/team/KnockoutTeam'
import {
  type KoWorkerData,
} from 'model/WorkerData'
import exposeWorker from 'utils/exposeWorker'

type GetPredicateParams = Parameters<typeof getPredicate>

const serializeArgs = ([year]: GetPredicateParams) =>
  JSON.stringify({
    year,
  })

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs)

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc)

exposeWorker((data: KoWorkerData<Team>) => {
  const {
    season,
    pots,
    matchups,
  } = data

  const predicate = getPredicateMemoized(season)
  const possiblePairings = getPossiblePairings(pots, matchups, predicate)

  return {
    possiblePairings,
  }
})
