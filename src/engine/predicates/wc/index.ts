import { Predicate } from '@draws/engine'

import Team from 'model/team/NationalTeam'
import hasLessThan from './hasLessThan'

const isFromUefa = (team: Team) =>
  team.confederation === 'uefa'

const uefaLessThanTwo = (group: Iterable<Team>) =>
  hasLessThan(2, group, isFromUefa)

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
    ? uefaLessThanTwo(group)
    : (
      group.every(team => team.confederation !== pickedConfederation)
      && (currentPotIndex !== 3 || group.some(isFromUefa))
    )
}

export default predicate
