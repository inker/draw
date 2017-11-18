import * as currentSeason from 'model/currentSeason'

const DEFAULT_TOURNAMENT = 'wc'

const currentSeasonByTournament = (tournament: string) =>
  currentSeason[tournament === 'wc' ? 'wc' : 'uefa']

export default (location?) => {
  if (!location) {
    return currentSeasonByTournament(DEFAULT_TOURNAMENT)
  }
  const [, tournament, , seasonString] = location.pathname.split('/')
  return +(seasonString || currentSeasonByTournament(tournament))
}
