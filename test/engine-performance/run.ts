import {
  random,
  sample,
  shuffle,
} from 'lodash'

type GetPossible = (pots, groups, selectedTeam, currentPotNum) => number[]

export default (numIterations: number, initialPots, getPossible: GetPossible) => {
  for (let i = 0; i < numIterations; ++i) {
    const pots = initialPots.map(pot => shuffle(pot))
    const groups = pots[0].map(team => [] as any)
    for (let currentPotNum = 0; currentPotNum < 4; ++currentPotNum) {
      const currentPot = pots[currentPotNum]
      while (currentPot.length > 0) {
        const pickedTeamIdx = random(0, currentPot.length - 1)
        const selectedTeam = currentPot.splice(pickedTeamIdx, 1)[0]
        const possibleGroups = getPossible(pots, groups, selectedTeam, currentPotNum)
        const pickedGroupIdx = sample(possibleGroups)!
        groups[pickedGroupIdx].push(selectedTeam)
      }
    }
  }
}
