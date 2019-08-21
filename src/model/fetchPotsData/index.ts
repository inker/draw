import config from '../../config.json'

import tryMultipleUrls from './tryMultipleUrls'

const { bertHost } = config
const currentSeason = config.currentSeason.uefa.cl.gs

const getUrl = (tournament: string, year: number) =>
  `${bertHost}/seed${tournament}${year}.html`

const getHistoryUrl = (tournament: string, year: number) =>
  `${bertHost}/history/seed${tournament}${year}.html`

export default (tournament: string, season: number) => {
  const urls = [
    getUrl(tournament, season),
    getHistoryUrl(tournament, season),
  ]

  if (season !== currentSeason) {
    urls.reverse()
  }

  return tryMultipleUrls(urls)
}
