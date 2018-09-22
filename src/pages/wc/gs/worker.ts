import { firstPossibleGroup } from 'engine/experimental/possible-groups'
import predicate from 'engine/experimental/wcPredicate'

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
