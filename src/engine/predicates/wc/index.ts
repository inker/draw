import { Predicate } from '@draws/engine'

import { Confederation } from 'model/types'
import Team from 'model/team/NationalTeam'
import getSmallestArrayLength from 'utils/getSmallestArrayLength'

import hasLessThan from './hasLessThan'

const GROUP_SIZE = 4

const isFrom = (confederation: Confederation) =>
  (team: Team) =>
    team.confederation === confederation

const isFromUefa = isFrom('UEFA')

const uefaLessThanTwo = (group: Iterable<Team>) =>
  hasLessThan(2, group, isFromUefa)

const isFromConfederationOf = (team: Team) =>
  isFrom(team.confederation)

const canFitUefa = (group: readonly Team[]) =>
  group.length < GROUP_SIZE - 1 || group.some(isFromUefa)

const groupIsPossibleForTeam = (team: Team, group: readonly Team[]) =>
  team.confederation === 'UEFA'
    ? uefaLessThanTwo(group)
    : !group.some(isFromConfederationOf(team)) && canFitUefa(group)

export default (): Predicate<Team> =>
  // eslint-disable-next-line unicorn/consistent-function-scoping
  (picked, groups, groupIndex) => {
    const group = groups[groupIndex]
    const currentPotIndex = getSmallestArrayLength(groups)
    return group.length <= currentPotIndex && groupIsPossibleForTeam(picked, group)
  }
