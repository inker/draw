import type Tournament from '#model/Tournament'
import type Stage from '#model/Stage'

import config from '../config'

const { wc, uefa } = config.currentSeason

export default (tournament: Tournament | null, stage: Stage | null): number =>
  tournament === 'wc' ? wc : uefa[tournament || 'cl'][stage || 'gs']
