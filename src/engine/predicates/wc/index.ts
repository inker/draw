import { Predicate } from '@draws/engine'

import { Confederation } from 'model/types'
import Team from 'model/team/NationalTeam'
import hasLessThan from './hasLessThan'

const uefaLessThanTwo = (group: Iterable<Team>) =>
  hasLessThan(2, group, isFromUefa)

const isFrom = (confederation: Confederation) =>
  (team: Team) =>
    team.confederation === confederation

const isFromConfederationOf = (team: Team) =>
  isFrom(team.confederation)

const isFromUefa = isFrom('UEFA')

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
  return picked.confederation === 'UEFA'
    ? uefaLessThanTwo(group)
    : (
      !group.some(isFromConfederationOf(picked))
      && (currentPotIndex !== 3 || group.some(isFromUefa))
    )
}

export default predicate
