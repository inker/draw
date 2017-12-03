import { memoize, uniqueId } from 'lodash'

import Team from 'model/team/GSTeam'
import extraConstraints from 'model/extraConstraints'

const groupIds = new WeakMap<Team[], string>()

const serialize = (group: Team[], picked: Team) => {
  let groupId = groupIds.get(group)
  if (!groupId) {
    groupId = uniqueId('gr')
    groupIds.set(group, groupId)
  }
  return `${groupId}...${picked.id}`
}

const groupContainsPairing = memoize(
  (group: Team[], picked: Team) => group.every(team => team !== picked.pairing),
  serialize,
)

export default (picked: Team, groupIndex: number, currentPotIndex: number, groups: Team[][]) => {
  const group = groups[groupIndex]
  if (group.length > currentPotIndex) {
    return false
  }
  const extra = extraConstraints(picked)
  if (group.some(team => team.country === picked.country || extra(team))) {
    return false
  }
  const half = groups.length >> 1
  const start = groupIndex < half ? 0 : half
  return groups
    .slice(start, start + half)
    .every(g => groupContainsPairing(g, picked))
}
