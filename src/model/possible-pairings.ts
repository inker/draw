import { range } from 'lodash'
import Team from 'model/team/KnockoutTeam'

import extraConstraints from './extraConstraints'

export default ([ groupWinners, runnersUp ]: Team[][], matchups: [Team, Team][], matchupNum: number): number[] => {

  function anyGroupWinners(branchNum: number, currentMatchupNum: number): boolean {
    const currentMatchup = matchups[currentMatchupNum]
    const currentlyPicked = currentMatchup[0]
    const extraCondition = extraConstraints(currentlyPicked)
    const o = groupWinners[branchNum]
    if (o.country === currentlyPicked.country || o.group === currentlyPicked.group || extraCondition(o)) {
      return false
    }
    groupWinners.splice(branchNum, 1)
    currentMatchup.push(o)
    const hasDescendants = ++currentMatchupNum === matchups.length || anyRunnersUp(matchups, currentMatchupNum)
    currentMatchup.pop()
    groupWinners.splice(branchNum, 0, o)
    return hasDescendants
  }

  function anyRunnersUp(virtualMatchups: Team[][], virtualMatchupNum: number): boolean {
    const virtualMatchup = virtualMatchups[virtualMatchupNum]
    const groupWinnersIndices = range(groupWinners.length)
    return runnersUp.some((ru, ruIndex) => {
      const virtualPicked = runnersUp.splice(ruIndex, 1)[0]
      virtualMatchup.push(virtualPicked)
      const hasAnyDescendants = groupWinnersIndices.some(j => anyGroupWinners(j, virtualMatchupNum))
      virtualMatchup.pop()
      runnersUp.splice(ruIndex, 0, virtualPicked)
      return hasAnyDescendants
    })
  }

  return range(groupWinners.length)
    .filter(i => anyGroupWinners(i, matchupNum))
}
