import {
  range,
  initial,
  last,
} from 'lodash'

type Predicate<T> = (picked: T, groupIndex: number, currentPotIndex: number, groups: T[][]) => boolean

export const allPossibleGroups = <T>(
  pots: T[][],
  groups: T[][],
  teamPicked: T,
  currentPotIndex: number,
  predicate: Predicate<T>,
): number[] => filterGroups('filter', pots, groups, teamPicked, currentPotIndex, predicate)

export const firstPossibleGroup = <T>(
  pots: T[][],
  groups: T[][],
  teamPicked: T,
  currentPotIndex: number,
  predicate: Predicate<T>,
): number => filterGroups('find', pots, groups, teamPicked, currentPotIndex, predicate)

const filterGroups = <T, U extends keyof T[]>(
  method: U,
  pots: T[][],
  groups: T[][],
  teamPicked: T,
  currentPotIndex: number,
  predicate: Predicate<T>,
) => range(0, groups.length)
  .filter(i => predicate(teamPicked, i, currentPotIndex, groups))
  [method as string](groupNum => {
    const newGroups = groups.slice()
    const oldGroup = newGroups[groupNum]
    newGroups[groupNum] = [...oldGroup, teamPicked]
    return groupIsPossible(pots, newGroups, currentPotIndex, predicate)
  })

function groupIsPossible<T>(
  pots: T[][],
  groups: T[][],
  currentPotIndex: number,
  predicate: Predicate<T>,
): boolean {
  if (pots[currentPotIndex].length === 0 && ++currentPotIndex === pots.length) {
    return true
  }
  const newPots = pots.slice()
  const oldPot = newPots[currentPotIndex]
  newPots[currentPotIndex] = initial(oldPot)
  const team = last(oldPot) as T
  return filterGroups('some', pots, groups, team, currentPotIndex, predicate)
}
