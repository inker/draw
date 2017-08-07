import { firstPossibleGroup } from 'model/possible-groups'

addEventListener('message', e => {
  const {
    pots,
    groups,
    selectedTeam,
    currentPotNum,
  } = e.data

  const pickedGroup = firstPossibleGroup(pots, groups, selectedTeam, currentPotNum)

  postMessage({
    selectedTeam,
    pickedGroup,
  })
})
