import { wc, uefa } from 'model/currentSeason'

export default (tournament: string) =>
  tournament === 'wc' ? wc : uefa
