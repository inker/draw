import { firstPossibleGroup } from '@draws/engine'

import predicate from 'engine/predicates/wc'

addEventListener('message', e => {
  const {
    messageId,
    data: {
      pots,
      groups,
      selectedTeam,
      currentPotNum,
    },
  } = e.data

  const pickedGroup = firstPossibleGroup(pots, groups, selectedTeam, currentPotNum, predicate)

  postMessage({
    messageId,
    data: {
      pickedGroup,
    },
  })
})
