import { type Predicate } from 'engine/backtracking/gs'

type OneOrTwo<T> = readonly [T] | readonly [T, T]

function anyGroupWinners<T>(
  item: T,
  [groupWinners, runnersUp]: readonly (readonly T[])[],
  matchups: readonly OneOrTwo<T>[],
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
    // eslint-disable-next-line no-use-before-define
    || anyRunnersUp([groupWinners.filter(i => i !== item), runnersUp], newMatchups, predicate)
}

function anyRunnersUp<T>(
  [groupWinners, runnersUp]: readonly (readonly T[])[],
  matchups: readonly OneOrTwo<T>[],
  predicate: Predicate<T>,
): boolean {
  const matchupNum = matchups.findIndex(m => !m.length)

  const [virtualPicked, ...newRunnersUp] = runnersUp
  const newMatchups = [...matchups]
  newMatchups[matchupNum] = [virtualPicked]

  return groupWinners
    .some(item => anyGroupWinners(item, [groupWinners, newRunnersUp], newMatchups, predicate))
}

// eslint-disable-next-line import/prefer-default-export
export const getPossiblePairings = <T>(
  [groupWinners, runnersUp]: readonly (readonly T[])[],
  matchups: readonly OneOrTwo<T>[],
  predicate: Predicate<T>,
): number[] =>
    groupWinners
      .map((item, i) => i)
      .filter(i => anyGroupWinners(groupWinners[i], [groupWinners, runnersUp], matchups, predicate))
