import currentSeasonByTournament from './currentSeasonByTournament'

const DEFAULT_TOURNAMENT = 'wc'

export default (location?) => {
  if (!location) {
    return currentSeasonByTournament(DEFAULT_TOURNAMENT)
  }
  const [, tournament, , seasonString] = location.pathname.split('/')
  return +(seasonString || currentSeasonByTournament(tournament))
}
