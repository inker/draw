import type Tournament from 'model/Tournament'

const withNext = (startYear: number) =>
  `${startYear}/${((startYear + 1) % 100).toString().padStart(2, '0')}`

export default (tournament: Tournament, startYear: number) =>
  tournament === 'wc' ? startYear : withNext(startYear)
