import { firstPossibleGroup } from 'model/experimental/possible-groups'
import predicate from 'model/experimental/wcPredicate'

addEventListener('message', e => {
  const {
    pots,
    groups,
    selectedTeam,
    currentPotNum,
  } = e.data

  const pickedGroup = firstPossibleGroup(pots, groups, selectedTeam, currentPotNum, predicate)

  postMessage({
    selectedTeam,
    pickedGroup,
  })
})
