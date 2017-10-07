import { range, last, memoize } from 'lodash'
import { GSTeam as Team } from './team'

const extraConstraints = (teamPicked: Team) =>
  teamPicked.country === 'ru' ?
    ((otherTeam: Team) => otherTeam.country === 'ua') : teamPicked.country === 'ua' ?
    ((otherTeam: Team) => otherTeam.country === 'ru') : (otherTeam: Team) => false

const foox = memoize((picked: Team, g: Team[]) => g.some(team => team === picked.pairing))

function pred(picked: Team, currentPotIndex: number, group: Team[], groups: Team[][]) {
  if (group.length > currentPotIndex) {
    return false
  }
  if (groups.some(g => foox(picked, g))) {
    return false
  }
  const foo = extraConstraints(picked)
  if (group.some(team => team.country === picked.country || foo(team))) {
    return false
  }
  return true
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
  return filterGroupsBasic(groups, teamPicked, currentPotIndex, pred).filter(groupNum => {
    const newGroups = groups.slice()
    const oldGroup = newGroups[groupNum]
    newGroups[groupNum] = [...oldGroup, teamPicked]
    return groupIsPossible(pots, newGroups, currentPotIndex)
  })
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
  return filterGroupsBasic(groups, teamPicked, currentPotIndex, pred).find(groupNum => {
    const newGroups = groups.slice()
    const oldGroup = newGroups[groupNum]
    newGroups[groupNum] = [...oldGroup, teamPicked]
    return groupIsPossible(pots, newGroups, currentPotIndex)
  }) as number
}

function groupIsPossible(
  pots: Team[][],
  groups: Team[][],
  currentPotIndex: number,
): boolean {
  if (pots[currentPotIndex].length === 0 && ++currentPotIndex === pots.length) {
    return true
  }
  const team = last(pots[currentPotIndex]) as Team
  return filterGroupsBasic(groups, team, currentPotIndex, pred).some(groupNum => {
    const newGroups = groups.slice()
    const oldGroup = newGroups[groupNum]
    newGroups[groupNum] = [...oldGroup, team]
    return groupIsPossible(pots, newGroups, currentPotIndex)
  })
}

type Predicate = (picked: Team, currentPotIndex: number, group: Team[], groups: Team[][]) => boolean

function filterGroupsBasic(
  groups: Team[][],
  teamPicked: Team,
  currentPotIndex: number,
  predicate: Predicate,
): number[] {
  return range(0, groups.length)
    .filter(i => predicate(teamPicked, currentPotIndex, groups[i], groups))
}
