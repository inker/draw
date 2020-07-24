import GsTeam from 'model/team/GsTeam'
import pairUpTeams from 'model/pairUpTeams'
import type {
  UefaCountry,
  FixedArray,
} from 'model/types'

import getClubName from 'utils/club-name'
import codeToCountryName from 'utils/codeToCountryName'

const TEXT_RE = /Pot 1\s{5}([\S\s]+?)<\/table>/
const LINE_RE = /(.{1,25})([A-Z][a-z]{2})\s([\d\s]{2}\d\.\d{3})/g

function tokensToGsTeam(tokens: FixedArray<string, 4>) {
  const longName = tokens[1]
    .replace(/\*\d?|(@\d)|\(([CE]L-)?TH\)/g, '')
    .trim()
  const country = codeToCountryName(tokens[2].toLowerCase()) as UefaCountry
  const shortName = getClubName(longName, country) || undefined
  const coefficient = +tokens[3]
  return new GsTeam(longName, country, coefficient, shortName)
}

async function parseGSTeams(data: string) {
  const tokens = data.match(TEXT_RE)
  if (!tokens) {
    throw new Error('could not parse')
  }

  const substr = tokens[1]
  return Array.from(substr.matchAll(LINE_RE), tokensToGsTeam)
}

function fillGSPots(teams: GsTeam[]): GsTeam[][] {
  const pots: GsTeam[][] = [[], [], [], []]
  const numTeams = teams.length
  const halfNum = numTeams >> 1

  for (let i = 0; i < numTeams; ++i) {
    const foo = ~~(i / halfNum)
    pots[foo << 1 | i % 2].push(teams[i])
  }

  return pots
}

export default async (data: string, pairings: readonly [string, string][]) => {
  const teams = await parseGSTeams(data)
  pairUpTeams(teams, pairings)
  return fillGSPots(teams)
}
