import { memoize } from 'lodash'

import { GSTeam as Team } from './team'

const serialize = (g: Team[], picked: Team) =>
  `${g.map(t => t.id).join(';')}...${picked.id}`

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
