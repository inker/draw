import { Predicate } from '@draws/engine'

import Team from 'model/team/NationalTeam'
import reducerWhile from 'utils/reduceWhile'

const lessThanTwo = (n: number) => n < 2

const hasMoreThan = (n: number) =>
  <T>(collection: Iterable<T>, pred: (item: T) => boolean) =>
    reducerWhile(lessThanTwo, (acc, item) => pred(item) ? acc + 1 : acc, 0, collection) > n

const hasMoreThanOne = hasMoreThan(1)

const isFromUefa = (item: Team) =>
  item.confederation === 'uefa'

const uefaMoreThanOne = (group: Iterable<Team>) =>
  hasMoreThanOne(group, isFromUefa)

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
  const pickedConfederation = picked.confederation
  return pickedConfederation === 'uefa'
    ? !uefaMoreThanOne(group)
    : (
      group.every(team => team.confederation !== pickedConfederation)
      && (currentPotIndex !== 3 || group.some(team => team.confederation === 'uefa'))
    )
}

export default predicate
