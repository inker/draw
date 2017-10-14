import { memoize, uniqueId } from 'lodash'

import Team from 'model/team/GSTeam'

const groupIds = new WeakMap<Team[], string>()

const serialize = (g: Team[], picked: Team) => {
  let a = groupIds.get(g)
  if (!a) {
    a = uniqueId('gr')
    groupIds.set(g, a)
  }
  return `${a}...${picked.id}`
}

const groupContainsPairing = memoize(
  (group: Team[], picked: Team) => group.every(team => team !== picked.pairing),
  serialize,
)

const extraConstraints = (teamPicked: Team) =>
  teamPicked.country === 'ru' ?
    ((otherTeam: Team) => otherTeam.country === 'ua')
  : teamPicked.country === 'ua' ?
    ((otherTeam: Team) => otherTeam.country === 'ru')
  : (otherTeam: Team) => false

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
