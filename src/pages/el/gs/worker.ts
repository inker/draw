import { firstPossibleGroup } from 'utils/possible-groups'

addEventListener('message', e => {
  const {
    pots,
    groups,
    selectedTeam,
    currentPotNum,
  } = e.data
  const groupNum = firstPossibleGroup(pots, groups, selectedTeam, currentPotNum)
  postMessage(groupNum)
})
