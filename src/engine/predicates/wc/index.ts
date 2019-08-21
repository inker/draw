import { Predicate } from '@draws/engine'

import { Confederation } from 'model/types'
import Team from 'model/team/NationalTeam'
import hasLessThan from './hasLessThan'

const GROUP_SIZE = 4

const uefaLessThanTwo = (group: Iterable<Team>) =>
  hasLessThan(2, group, isFromUefa)

const isFrom = (confederation: Confederation) =>
  (team: Team) =>
    team.confederation === confederation

const isFromConfederationOf = (team: Team) =>
  isFrom(team.confederation)

const isFromUefa = isFrom('UEFA')

const canFitUefa = (group: Team[]) =>
  group.length < GROUP_SIZE - 1 || group.some(isFromUefa)

const groupIsPossibleForTeam = (team: Team, group: Team[]) =>
  team.confederation === 'UEFA'
    ? uefaLessThanTwo(group)
    : !group.some(isFromConfederationOf(team)) && canFitUefa(group)

const predicate: Predicate<Team> = (
  picked: Team,
  groupIndex: number,
  currentPotIndex: number,
  groups: Team[][],
) => {
  const group = groups[groupIndex]
  return group.length <= currentPotIndex && groupIsPossibleForTeam(picked, group)
}

export default predicate
