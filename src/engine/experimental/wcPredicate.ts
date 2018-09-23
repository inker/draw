import Team from 'model/team/NationalTeam'
import countGreaterThan from 'utils/countGreaterThan'
import Predicate from './types/Predicate'

const predicate: Predicate<Team> = (
  picked: Team,
  groupIndex: number,
  currentPotIndex: number,
  groups: Team[][],
) => {
  const group = groups[groupIndex]
  if (group.length > currentPotIndex) {
    return false
  }
  const pickedConfederation = picked.confederation
  return pickedConfederation === 'uefa'
    ? !countGreaterThan(group, 1, team => team.confederation === pickedConfederation)
    : (
      group.every(team => team.confederation !== pickedConfederation)
      && (currentPotIndex !== 3 || group.some(team => team.confederation === 'uefa'))
    )
}

export default predicate
