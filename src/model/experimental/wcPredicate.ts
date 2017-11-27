import Team from 'model/team/NationalTeam'

import countGreaterThan from 'utils/countGreaterThan'

export default (picked: Team, groupIndex: number, currentPotIndex: number, groups: Team[][]) => {
  const group = groups[groupIndex]
  if (group.length > currentPotIndex) {
    return false
  }
  const pickedConfederation = picked.confederation
  const isImpossible = pickedConfederation === 'uefa'
    ? countGreaterThan(group, 1, team => team.confederation === pickedConfederation)
    : (
      group.some(team => team.confederation === pickedConfederation)
      || currentPotIndex === 3 && group.every(team => team.confederation !== 'uefa')
    )
  return !isImpossible
}
