import GSTeam from 'model/team/GSTeam'
import pairUpTeams from 'model/pairUpTeams'

import getClubName from 'utils/club-name'
import codeToCountryName from 'utils/codeToCountryName'

async function parseGSTeams(data: string) {
  const textRe = /Pot 1\s{5}([\s\S]+?)<\/table>/
  const tokens = data.match(textRe)
  if (!tokens) {
    throw new Error('could not parse')
  }
  data = tokens[1]
  const re = /(.{1,25})([A-Z][a-z]{2})\s([\s\d]{2}\d\.\d{3})/g
  const teams: GSTeam[] = []
  let matches: RegExpExecArray | null
  // tslint:disable-next-line:no-conditional-assignment
  while ((matches = re.exec(data)) !== null) {
    const longName = matches[1]
      .replace(/\*|(@\d)|\(([CE]L-)?TH\)/g, '')
      .trim()
    const country = codeToCountryName(matches[2].toLowerCase())
    const shortName = getClubName(longName, country) || undefined
    const coefficient = +matches[3]
    teams.push(new GSTeam(longName, country, coefficient, shortName))
  }
  return teams
}

function fillGSPots(teams: GSTeam[]): GSTeam[][] {
  const pots: GSTeam[][] = [[], [], [], []]
  const numTeams = teams.length
  const halfNum = numTeams >> 1
  for (let i = 0; i < numTeams; ++i) {
    const foo = ~~(i / halfNum)
    pots[foo << 1 | i % 2].push(teams[i])
  }
  return pots
}

export default (data: string, pairings) =>
  parseGSTeams(data)
    .then(teams => pairUpTeams(teams, pairings))
    .then(fillGSPots)
