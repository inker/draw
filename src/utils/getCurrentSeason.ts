import { Location } from 'history'

import currentSeasonByTournament from './currentSeasonByTournament'

const DEFAULT_TOURNAMENT = 'wc'
const DEFAULT_STAGE = 'gs'

export default (location?: Location) => {
  if (!location) {
    return currentSeasonByTournament(DEFAULT_TOURNAMENT, DEFAULT_STAGE)
  }
  const [, tournament, stage, seasonString] = location.pathname.split('/')
  return +(seasonString || currentSeasonByTournament(tournament, stage as any))
}
