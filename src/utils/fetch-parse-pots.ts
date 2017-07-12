import { GSTeam, Last16Team } from './team'
import * as pairings from 'data/pairings.json'

const getUrl = (year: number) => `http://kassiesa.home.xs4all.nl/bert/uefa/seedcl${year}.html`

export async function tryFetchPots(year: number, numAttempts: number) {
  for (let i = 0; i < numAttempts; ++i) {
    try {
      const fetched = await fetchPots(getUrl(year - i))
      return fetched
    } catch (err) {
      console.error(err)
    }
  }
  throw new Error('could not fetch pots')
}

export default (url: string, groupStage = true) =>
  fetchPots(url).then(groupStage ? parseGS : parseLast16Teams)

export async function fetchPots(url: string) {
  const response = await fetch(`https://proxy-antonv.rhcloud.com/?url=${encodeURIComponent(url)}&encoding=latin1`)
  if (response.status !== 200) {
    throw new Error(`${url}: 404`)
  }
  const text = await response.text()
  if (text.includes('<title>404 Not Found</title>')) {
    // stupid Bert... or me...
    throw new Error(`${url}: 404`)
  }
  return text
}

export function parseGS(body) {
  const parsedTeams = parseGSTeams(body)
  const teams = pairUpTeams(parsedTeams)
  return fillGSPots(teams)
}

export function parseLast16Teams(data: string): Last16Team[][] {
  data = data.slice(data.lastIndexOf('--------------'))
  const pots: Last16Team[][] = [[], []]
  const re = /\s*(.+?)(\s\*+\d?|\([CE]L-TH\)?\s+)?\s{2,}(\w{3})\s+/g
  let matches: RegExpExecArray | null
  for (let i = 0; i < 16 && (matches = re.exec(data)) !== null; ++i) {
    pots[i % 2].push(new Last16Team(matches[1], matches[3], i >> 1))
  }
  return pots
}

function parseGSTeams(data: string): GSTeam[] {
  const re = /\s*(.+?)\s*(\*+\d?|\([CE]L-TH\))?\s+(\w{3})\s+(\d{1,3}\.\d{3})/g
  data = data.slice(data.indexOf('Pot 1'))
  const teams: GSTeam[] = []
  let matches: RegExpExecArray | null
  while ((matches = re.exec(data)) !== null) {
    teams.push(new GSTeam(matches[1], matches[3], +matches[4]))
  }
  return teams
}

function findTeam(teams: GSTeam[], name: string) {
  const team = teams.find(t => t.name.includes(name))
  if (!team) {
    console.error(`team ${name} not found`)
  }
  return team
}

function pairUpTeams(teams: GSTeam[]): GSTeam[] {
  for (const [team1str, team2str] of pairings) {
    const team1 = findTeam(teams, team1str)
    const team2 = findTeam(teams, team2str)
    if (!team1 || !team2) {
      continue
    }
    if (team1.country !== team2.country) {
      throw new Error(`teams ${team1.name} & ${team2.name} cannot be paired up`)
    }
    team1.pairing = team2
    team2.pairing = team1
  }
  return teams
}

function fillGSPots(teams: GSTeam[]): GSTeam[][] {
  const pots: GSTeam[][] = [[], [], [], []]
  for (let i = 0; i < teams.length; ++i) {
    pots[i >> 4 << 1 | i % 2].push(teams[i])
  }
  return pots
}
