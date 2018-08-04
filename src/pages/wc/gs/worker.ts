import { firstPossibleGroup } from 'model/experimental/possible-groups'
import predicate from 'model/experimental/wcPredicate'

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
