import { Predicate } from '@draws/engine'

type OneOrTwo<T> = [T] | [T, T]

function anyGroupWinners<T>(
  item: T,
  [groupWinners, runnersUp]: T[][],
  matchups: OneOrTwo<T>[],
  matchupNum: number,
  predicate: Predicate<T>,
): boolean {
  if (!predicate(item, matchupNum, 0, matchups)) {
    return false
  }

  const newMatchups = [...matchups]
  const ex = newMatchups[matchupNum][0]
  newMatchups[matchupNum] = [ex, item]

  const nextMatchupNum = matchupNum + 1
  return nextMatchupNum === newMatchups.length
    || anyRunnersUp([groupWinners.filter(i => i !== item), runnersUp], newMatchups, nextMatchupNum, predicate)
}

function anyRunnersUp<T>(
  [groupWinners, runnersUp]: T[][],
  matchups: OneOrTwo<T>[],
  matchupNum: number,
  predicate: Predicate<T>,
): boolean {
  const [virtualPicked, ...newRunnersUp] = runnersUp
  const newMatchups = [...matchups]
  newMatchups[matchupNum] = [virtualPicked]

  return groupWinners
    .some(item => anyGroupWinners(item, [groupWinners, newRunnersUp], newMatchups, matchupNum, predicate))
}

export default <T>(
  [groupWinners, runnersUp]: T[][],
  matchups: OneOrTwo<T>[],
  matchupNum: number,
  predicate: Predicate<T>,
): number[] => {
  return groupWinners
    .map((item, i) => i)
    .filter(i => anyGroupWinners(groupWinners[i], [groupWinners, runnersUp], matchups, matchupNum, predicate))
}
