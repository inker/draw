import delay from 'delay.js'

import config from '../config.json'

import proxy from 'utils/proxy'

const BERT_HOST = 'http://kassiesa.home.xs4all.nl/bert/uefa'

const currentSeason = config.currentSeason.uefa.cl.gs

const getUrl = (tournament: string, year: number) =>
  `${BERT_HOST}/seed${tournament}${year}.html`

const getHistoryUrl = (tournament: string, year: number) =>
  `${BERT_HOST}/history/seed${tournament}${year}.html`

async function tryFetch(url: string) {
  while (!navigator.onLine) {
    console.error("you're offline, retrying...")
    await delay(1000)
  }
  const text = await proxy(url, 'latin1')
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
