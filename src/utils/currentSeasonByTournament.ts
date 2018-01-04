import config from '../config.json'

const { wc, uefa } = config.currentSeason

export default (tournament: string, stage: string) =>
  tournament === 'wc' ? wc : uefa[tournament || 'cl'][stage || 'gs']
