import CURRENT_UEFA_SEASON from 'model/currentSeason'

const CURRENT_WC_SEASON = 2018

const DEFAULT_TOURNAMENT = 'wc'

const currentSeasonByTournament = (tournament: string) =>
  tournament === 'wc' ? CURRENT_WC_SEASON : CURRENT_UEFA_SEASON

export default (location?) => {
  if (!location) {
    return currentSeasonByTournament(DEFAULT_TOURNAMENT)
  }
  const [, tournament, , seasonString] = location.pathname.split('/')
  return +(seasonString || currentSeasonByTournament(tournament))
}
