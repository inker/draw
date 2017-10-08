import { firstPossibleGroup } from 'model/possible-groups'
import predicate from 'model/predicate'

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
