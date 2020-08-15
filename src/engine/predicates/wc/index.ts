import { Predicate } from '@draws/engine'
import {
  countBy,
  sumBy,
  mapValues,
} from 'lodash'

import { Confederation } from 'model/types'
import Team from 'model/team/NationalTeam'
import getSmallestArrayLength from 'utils/getSmallestArrayLength'

import getNumGroupsByYear from './getNumGroupsByYear'

type BerthsByConf = {
  [key in Confederation]: number
}

export default (year: number, teams: readonly Team[]): Predicate<Team> => {
  const numGroups = getNumGroupsByYear(year)
  const groupSize = teams.length / numGroups
  const berthsByConfederation = countBy(teams, team => team.confederation) as BerthsByConf
  const confMinMax = mapValues(berthsByConfederation, v => {
    const teamsPerGroup = v / numGroups
    return [Math.floor(teamsPerGroup), Math.ceil(teamsPerGroup)] as const
  })
  const confMinMaxEntries = Object.entries(confMinMax)

  return (picked, groups, groupIndex) => {
    const group = groups[groupIndex]
    const currentPotIndex = getSmallestArrayLength(groups)

    if (group.length > currentPotIndex) {
      return false
    }

    const numRemainingTeams = groupSize - group.length
    const virtualGroup = [...group, picked]
    return confMinMaxEntries.every(([conf, [min, max]]) => {
      const n = sumBy(virtualGroup, team => team.confederation === conf ? 1 : 0)
      return n <= max && n > min - numRemainingTeams
    })
  }
}
