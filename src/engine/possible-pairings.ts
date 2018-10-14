import Team from 'model/team/KnockoutTeam'

import predicate from './predicates/ko'

export default ([ groupWinners, runnersUp ]: Team[][], matchups: [Team, Team][], matchupNum: number): number[] => {

  function anyGroupWinners(branchNum: number, currentMatchupNum: number): boolean {
    const o = groupWinners[branchNum]
    if (!predicate(o, currentMatchupNum, 0, matchups)) {
      return false
    }

    const currentMatchup = matchups[currentMatchupNum]
    groupWinners.splice(branchNum, 1)
    currentMatchup.push(o)

    const nextMatchupNum = currentMatchupNum + 1
    const hasDescendants = nextMatchupNum === matchups.length
      || anyRunnersUp(nextMatchupNum)
    // restore
    currentMatchup.pop()
    groupWinners.splice(branchNum, 0, o)
    // return
    return hasDescendants
  }

  function anyRunnersUp(virtualMatchupNum: number): boolean {
    const virtualMatchup = matchups[virtualMatchupNum]

    const virtualPicked = runnersUp.pop()!
    virtualMatchup.push(virtualPicked)

    const hasDescendants = groupWinners
      .some((item, i) => anyGroupWinners(i, virtualMatchupNum))
    // restore
    virtualMatchup.pop()
    runnersUp.push(virtualPicked)
    // return
    return hasDescendants
  }

  return groupWinners
    .map((item, i) => i)
    .filter(i => anyGroupWinners(i, matchupNum))
}
