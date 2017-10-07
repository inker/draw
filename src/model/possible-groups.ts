import {
  memoize,
  range,
  initial,
  last,
} from 'lodash'

import { GSTeam as Team } from './team'

const extraConstraints = (teamPicked: Team) =>
  teamPicked.country === 'ru' ?
    ((otherTeam: Team) => otherTeam.country === 'ua') : teamPicked.country === 'ua' ?
    ((otherTeam: Team) => otherTeam.country === 'ru') : (otherTeam: Team) => false

const foo = memoize(
  (g: Team[], picked: Team) => g.every(team => team !== picked.pairing),
  (g: Team[], picked: Team) => `${g.map(t => t.id).join(';')}...${picked.id}`,
)

function pred(picked: Team, groupIndex: number, currentPotIndex: number, groups: Team[][]) {
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
    .every(g => foo(g, picked))
}

function bar(groupNum: number, team: Team, groups: Team[][], pots: Team[][], currentPotIndex: number) {
  const newGroups = groups.slice()
  const oldGroup = newGroups[groupNum]
  newGroups[groupNum] = [...oldGroup, team]
  return groupIsPossible(pots, newGroups, currentPotIndex)
}

export function allPossibleGroups(
  pots: Team[][],
  groups: Team[][],
  teamPicked: Team,
  currentPotIndex: number,
) {
  if (groups.every(group => group.length === 0)) {
    return range(groups.length)
  }
  return filterGroupsBasic(groups, teamPicked, currentPotIndex, pred)
    .filter(groupNum => bar(groupNum, teamPicked, groups, pots, currentPotIndex))
}

export function firstPossibleGroup(
  pots: Team[][],
  groups: Team[][],
  teamPicked: Team,
  currentPotIndex: number,
) {
  if (groups.every(group => group.length === 0)) {
    return 0
  }
  return filterGroupsBasic(groups, teamPicked, currentPotIndex, pred)
    .find(groupNum => bar(groupNum, teamPicked, groups, pots, currentPotIndex))
}

function groupIsPossible(
  pots: Team[][],
  groups: Team[][],
  currentPotIndex: number,
): boolean {
  if (pots[currentPotIndex].length === 0 && ++currentPotIndex === pots.length) {
    return true
  }
  const newPots = pots.slice()
  const oldPot = newPots[currentPotIndex]
  newPots[currentPotIndex] = initial(oldPot)
  const team = last(oldPot) as Team
  return filterGroupsBasic(groups, team, currentPotIndex, pred)
    .some(groupNum => bar(groupNum, team, groups, newPots, currentPotIndex))
}

type Predicate = (picked: Team, groupIndex: number, currentPotIndex: number, groups: Team[][]) => boolean
function filterGroupsBasic(
  groups: Team[][],
  teamPicked: Team,
  currentPotIndex: number,
  predicate: Predicate,
): number[] {
  return range(0, groups.length)
    .filter(i => predicate(teamPicked, i, currentPotIndex, groups))
}
