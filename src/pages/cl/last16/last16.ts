import { Last16Team as Team } from 'utils/team'

export default (pots: Team[][], matchups: Team[][], currentMatchupNum: number): number[] => {
  const [ groupWinners, runnersUp ] = pots

  function anyGroupWinners(branchNum: number, currentMatchupNum: number): boolean {
    const currentMatchup = matchups[currentMatchupNum]
    const currentlyPicked = currentMatchup[0]
    const o = groupWinners[branchNum]
    if (o.country === currentlyPicked.country || o.group === currentlyPicked.group) return false
    groupWinners.splice(branchNum, 1)
    currentMatchup.push(o)
    const hasDescendants = ++currentMatchupNum === matchups.length || anyRunnersUp(matchups, currentMatchupNum)
    currentMatchup.pop()
    groupWinners.splice(branchNum, 0, o)
    return hasDescendants
  }

  function anyRunnersUp(virtualMatchups: Team[][], virtualMatchupNum: number): boolean {
    const virtualMatchup = virtualMatchups[virtualMatchupNum]
    const groupWinnersIndices = groupWinners.map((team, i) => i)
    return runnersUp.some((ru, ruIndex) => {
      const virtualPicked = runnersUp.splice(ruIndex, 1)[0]
      virtualMatchup.push(virtualPicked)
      const hasAnyDescendants = groupWinnersIndices.some(j => anyGroupWinners(j, virtualMatchupNum))
      virtualMatchup.pop()
      runnersUp.splice(ruIndex, 0, virtualPicked)
      return hasAnyDescendants
    })
  }

  return groupWinners
    .map((team, i) => i)
    .filter(i => anyGroupWinners(i, currentMatchupNum))
}
