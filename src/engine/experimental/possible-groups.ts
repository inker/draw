import {
  range,
  initial,
  last,
} from 'lodash'

import Predicate from './types/Predicate'

export const allPossibleGroups = <T>(
  pots: T[][],
  groups: T[][],
  teamPicked: T,
  currentPotIndex: number,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, teamPicked, currentPotIndex, predicate)
    .filter(groupNum => groupPredicate(pots, groups, teamPicked, groupNum, currentPotIndex, predicate))

export const firstPossibleGroup = <T>(
  pots: T[][],
  groups: T[][],
  teamPicked: T,
  currentPotIndex: number,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, teamPicked, currentPotIndex, predicate)
    .find(groupNum => groupPredicate(pots, groups, teamPicked, groupNum, currentPotIndex, predicate))

const filterGroups = <T>(
  groups: T[][],
  teamPicked: T,
  currentPotIndex: number,
  predicate: Predicate<T>,
) => range(0, groups.length)
  .filter(i => predicate(teamPicked, i, currentPotIndex, groups))

function groupPredicate<T>(
  pots: T[][],
  groups: T[][],
  teamPicked: T,
  groupNum: number,
  currentPotIndex: number,
  predicate: Predicate<T>,
): boolean {
  const newGroups = groups.slice()
  const oldGroup = newGroups[groupNum]
  newGroups[groupNum] = [...oldGroup, teamPicked]
  return groupIsPossible(pots, newGroups, currentPotIndex, predicate)
}

function groupIsPossible<T>(
  pots: T[][],
  groups: T[][],
  currentPotIndex: number,
  predicate: Predicate<T>,
) {
  if (pots[currentPotIndex].length === 0 && ++currentPotIndex === pots.length) {
    return true
  }
  const newPots = pots.slice()
  const oldPot = newPots[currentPotIndex]
  newPots[currentPotIndex] = initial(oldPot)
  const team = last(oldPot)!
  return filterGroups(groups, team, currentPotIndex, predicate)
    .some(groupNum => groupPredicate(newPots, groups, team, groupNum, currentPotIndex, predicate))
}
