import { allPossibleGroups } from '@draws/engine'

import predicate from 'engine/predicates/gs'

addEventListener('message', e => {
  const {
    messageId,
    data: {
      pots,
      groups,
      selectedTeam,
    },
  } = e.data

  const possibleGroups = allPossibleGroups(pots, groups, selectedTeam, predicate)
  // const pickedGroup = firstPossibleGroup(pots, groups, selectedTeam, currentPotNum)

  postMessage({
    messageId,
    data: {
      possibleGroups,
    },
  })
})
