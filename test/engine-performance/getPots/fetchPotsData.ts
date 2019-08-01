import * as request from 'request-promise-native'

const BERT_HOST = 'https://kassiesa.net/uefa'

const currentSeason = 2018

const getUrl = (tournament: string, year: number) =>
  `${BERT_HOST}/seed${tournament}${year}.html`

const getHistoryUrl = (tournament: string, year: number) =>
  `${BERT_HOST}/history/seed${tournament}${year}.html`

async function tryFetch(url: string) {
  const text = await request(url)
  if (text.includes('<title>404 Not Found</title>')) {
    // stupid me
    throw new Error(`${url}: 404`)
  }
  return text
}

async function tryMultipleUrls(urls: string[]) {
  for (const url of urls) {
    try {
      return await tryFetch(url)
    } catch (err) {
      console.error(err)
    }
  }
  throw new Error(`could not load urls ${urls.join(', ')}`)
}

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
