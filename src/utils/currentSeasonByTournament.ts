import { wc, uefaGs, uefaKo } from 'model/currentSeason'

type Stage = 'gs' | 'ko'

export default (tournament: string, stage: Stage) =>
  tournament === 'wc' ? wc : stage === 'ko' ? uefaKo : uefaGs
