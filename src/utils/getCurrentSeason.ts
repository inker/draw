import { Location } from 'history'

import config from '../config.json'

import currentSeasonByTournament from './currentSeasonByTournament'

const { defaultTournament, defaultStage } = config

export default (location?: Location) => {
  if (!location) {
    return currentSeasonByTournament(defaultTournament, defaultStage)
  }
  const [, tournament, stage, seasonString] = location.pathname.split('/')
  return +(seasonString || currentSeasonByTournament(tournament, stage as any))
}
