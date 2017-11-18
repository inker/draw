const withNext = (startYear: number) =>
  `${startYear}/${((startYear + 1) % 100).toString().padStart(2, '0')}`

export default (tournament: string, startYear: number) =>
  tournament === 'wc' ? startYear : withNext(startYear)
