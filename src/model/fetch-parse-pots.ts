import { mobile } from 'bowser'
import delay from 'delay.js'

import * as countryNames from 'data/country-names.json'
import * as pairings from 'data/pairings.json'

import proxify from 'utils/proxify'
import deleteFromArray from 'utils/deleteFromArray'

import { GSTeam, Last16Team } from './team'
import currentSeason from './currentSeason'

declare const System: any

const getClubName = mobile && System.import('utils/club-name')

const BERT_HOST = 'http://kassiesa.home.xs4all.nl/bert/uefa'

const getUrl = (tournament: string, year: number) =>
  `${BERT_HOST}/seed${tournament}${year}.html`

const getHistoryUrl = (tournament: string, year: number) =>
  `${BERT_HOST}/history/seed${tournament}${year}.html`

export async function tryFetch(url: string) {
  while (!navigator.onLine) {
    console.error("you're offline, retrying...")
    await delay(1000)
  }
  const response = await fetch(proxify(url, 'latin1'))
  if (response.status !== 200) {
    throw new Error(`${url}: ${response.status}`)
  }
  const text = await response.text()
  if (text.includes('<title>404 Not Found</title>')) {
    // stupid me
    throw new Error(`${url}: 404`)
  }
  return text
}

export async function tryMultipleUrls(urls: string[]) {
  for (const url of urls) {
    try {
      const text = await tryFetch(url)
      return text
    } catch (err) {
      console.error(err)
    }
  }
  throw new Error(`could not load urls ${urls.join(', ')}`)
}

export default (tournament: string, groupStage = true) =>
  fetchPots(tournament, currentSeason).then(groupStage ? parseGS : parseLast16Teams)

export async function fetchPots(tournament: string, season: number) {
  const urls = [getUrl(tournament, season), getHistoryUrl(tournament, season)]
  if (season !== currentSeason) {
    urls.reverse()
  }
  const text = await tryMultipleUrls(urls)
  return text
}

export async function parseGS(body: string) {
  const parsedTeams = await parseGSTeams(body)
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

const findTeam = (teams: GSTeam[], name: string) =>
  teams.find(team => team.name.includes(name))

function pairUpTeams(teams: GSTeam[]): GSTeam[] {
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
    deleteFromArray(teamsCopy, team1)
    deleteFromArray(teamsCopy, team2)
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
