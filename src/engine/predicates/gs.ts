import { Predicate } from '@draws/engine'

import Team from 'model/team/GSTeam'
import extraConstraints from '../extraConstraints'

function getHalf<T>(array: T[], index: number) {
  const mid = array.length >> 1
  const start = index < mid ? 0 : mid
  return array.slice(start, start + mid)
}

function groupHasPairing(group: Team[], pairing: Team) {
  const pairingId = pairing.id
  return group.some(team => team.id === pairingId)
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

  const { pairing } = picked
  if (!pairing) {
    return true
  }

  const halfGroups = getHalf(groups, groupIndex)
  return !halfGroups.some(g => groupHasPairing(g, pairing))
}

export default predicate
