import config from '../config'

import Tournament from 'model/Tournament'
import Stage from 'model/Stage'

const { wc, uefa } = config.currentSeason

export default (tournament: Tournament | null, stage: Stage | null): number =>
  tournament === 'wc' ? wc : uefa[tournament || 'cl'][stage || 'gs']
