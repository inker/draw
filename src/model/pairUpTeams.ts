import fastDelete from 'fast-delete'

import pairings from 'data/pairings.json'
import GSTeam from 'model/team/GSTeam'

const findTeam = (teams: GSTeam[], name: string) =>
  teams.find(team => team.name.includes(name))

export default (teams: GSTeam[]): GSTeam[] => {
  const teamsCopy = teams.slice()
  for (const [team1str, team2str] of pairings) {
    const team1 = findTeam(teamsCopy, team1str)
    const team2 = findTeam(teamsCopy, team2str)
    if (!team1 || !team2) {
      continue
    }
    if (team1.country !== team2.country) {
      throw new Error(`teams ${team1.name} & ${team2.name} cannot be paired up`)
    }
    team1.pairing = team2
    team2.pairing = team1
    fastDelete(teamsCopy, team1)
    fastDelete(teamsCopy, team2)
  }
  teamsCopy.sort((a, b) => b.coefficient - a.coefficient)
  const len = teamsCopy.length
  const lenm1 = len - 1
  for (let i = 0; i < lenm1; ++i) {
    const team = teamsCopy[i]
    if (team.pairing) {
      continue
    }
    for (let j = i + 1; j < len; ++j) {
      const other = teamsCopy[j]
      if (other.pairing || team.country !== other.country) {
        continue
      }
      team.pairing = other
      other.pairing = team
      break
    }
  }
  return teams
}
