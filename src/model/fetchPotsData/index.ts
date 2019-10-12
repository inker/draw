import config from '../../config'

import Tournament from 'model/Tournament'

import tryMultipleUrls from './tryMultipleUrls'

const { bertHost } = config
const currentSeason = config.currentSeason.uefa.cl.gs

const getUrl = (tournament: Tournament, year: number) =>
  `${bertHost}/seed${tournament}${year}.html`

const getHistoryUrl = (tournament: Tournament, year: number) =>
  `${bertHost}/history/seed${tournament}${year}.html`

export default (tournament: Tournament, season: number) => {
  const urls = [
    getUrl(tournament, season),
    getHistoryUrl(tournament, season),
  ]

  if (season !== currentSeason) {
    urls.reverse()
  }

  return tryMultipleUrls(urls)
}
