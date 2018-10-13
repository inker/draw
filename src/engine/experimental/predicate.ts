import Team from 'model/team/GSTeam'
import Predicate from './types/Predicate'
import extraConstraints from '../extraConstraints'

function getHalf<T>(array: T[], index: number) {
  const mid = array.length >> 1
  const start = index < mid ? 0 : mid
  return array.slice(start, start + mid)
}

function groupHasPairing(group: Team[], picked: Team) {
  const { pairing } = picked
  return !!pairing && group.some(team => team.id === pairing.id)
}

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

  const extra = extraConstraints(picked)
  if (group.some(team => team.country === picked.country || extra(team))) {
    return false
  }

  const halfGroups = getHalf(groups, groupIndex)
  return !halfGroups.some(g => groupHasPairing(g, picked))
}

export default predicate
