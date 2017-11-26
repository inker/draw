import { mobile } from 'bowser'

import countryNames from 'data/country-names.json'

import GSTeam from 'model/team/GSTeam'
import pairUpTeams from 'model/pairUpTeams'

const getClubName = mobile && import('utils/club-name')

async function parseGSTeams(data: string) {
  const textRe = /Pot 1\s{5}([\s\S]+?)<\/table>/
  const tokens = data.match(textRe)
  if (!tokens) {
    throw new Error('could not parse')
  }
  data = tokens[1]
  const re = /\s*(.+?)\s*(\*+\d?|\(([CE]L-)?TH\))?\s+(\w{3})\s+(\d{1,3}\.\d{3})/g
  const teams: GSTeam[] = []
  let matches: RegExpExecArray | null
  while ((matches = re.exec(data)) !== null) {
    const longName = matches[1]
      .replace(/\*|(@\d)/g, '')
      .trim()
    const country = countryNames[matches[4].toLowerCase()]
    const shortName = getClubName && (await getClubName).default(longName, country) || undefined
    const coefficient = +matches[5]
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

export default (body: string) =>
  parseGSTeams(body)
    .then(pairUpTeams)
    .then(fillGSPots)
