import {
  shuffle,
} from 'lodash'

import { allPossibleGroups } from 'engine/possible-groups'
import { allPossibleGroups as allPossibleGroupsExperimental } from 'engine/experimental/possible-groups'
import predicate from 'engine/experimental/predicate'

import getPots from './getPots'
import run from './run'

const NUM_ITERATIONS = 100
const TOURNAMENT = 'cl'
const SEASON = 2018

async function main() {
  const initialPots = await getPots(SEASON, TOURNAMENT)
  // console.log('pots', initialPots)

  const funcs = [
    () => {
      console.time('traditional')
      run(
        NUM_ITERATIONS,
        initialPots,
        (pots, groups, selectedTeam, currentPotNum) => allPossibleGroups(pots, groups, selectedTeam, currentPotNum),
      )
      console.timeEnd('traditional')
    },
    () => {
      console.time('no memo')
      run(
        NUM_ITERATIONS,
        initialPots,
        (pots, groups, selectedTeam, currentPotNum) => allPossibleGroupsExperimental(pots, groups, selectedTeam, currentPotNum, predicate),
      )
      console.timeEnd('no memo')
    },
  ]

  for (const func of shuffle(funcs)) {
    func()
  }
}

main()
