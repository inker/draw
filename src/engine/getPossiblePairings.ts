import { Predicate } from '@draws/engine'

type OneOrTwo<T> = [T] | [T, T]

function anyGroupWinners<T>(
  item: T,
  [groupWinners, runnersUp]: T[][],
  matchups: OneOrTwo<T>[],
  predicate: Predicate<T>,
): boolean {
  const matchupNum = matchups.findIndex(m => m.length === 1)
  if (!predicate(item, matchups, matchupNum)) {
    return false
  }

  const newMatchups = [...matchups]
  const ex = newMatchups[matchupNum][0]
  newMatchups[matchupNum] = [ex, item]

  const nextMatchupNum = matchupNum + 1
  return nextMatchupNum === newMatchups.length
    || anyRunnersUp([groupWinners.filter(i => i !== item), runnersUp], newMatchups, predicate)
}

function anyRunnersUp<T>(
  [groupWinners, runnersUp]: T[][],
  matchups: OneOrTwo<T>[],
  predicate: Predicate<T>,
): boolean {
  const matchupNum = matchups.findIndex(m => !m.length)

  const [virtualPicked, ...newRunnersUp] = runnersUp
  const newMatchups = [...matchups]
  newMatchups[matchupNum] = [virtualPicked]

  return groupWinners
    .some(item => anyGroupWinners(item, [groupWinners, newRunnersUp], newMatchups, predicate))
}

export default <T>(
  [groupWinners, runnersUp]: T[][],
  matchups: OneOrTwo<T>[],
  predicate: Predicate<T>,
): number[] => {
  return groupWinners
    .map((item, i) => i)
    .filter(i => anyGroupWinners(groupWinners[i], [groupWinners, runnersUp], matchups, predicate))
}
