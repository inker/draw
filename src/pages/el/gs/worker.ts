import { firstPossibleGroup } from '@draws/engine'

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

  const pickedGroup = firstPossibleGroup(pots, groups, selectedTeam, predicate)
  // const pickedGroup = firstPossibleGroup(pots, groups, selectedTeam, currentPotNum)

  postMessage({
    messageId,
    data: {
      pickedGroup,
    },
  })
})
