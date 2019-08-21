import { flatten } from 'lodash'

import waitUntilOnline from 'utils/waitUntilOnline'
import proxy from 'utils/proxy'
import makeRequest from 'utils/makeRequest'
import tryMultipleAsync from 'utils/tryMultipleAsync'

const fetchWithEncoding = (url: string) =>
  proxy(url, 'latin1')

async function tryFetch(url: string, dataGetter: (url: string) => Promise<string> | string) {
  await waitUntilOnline(250)
  const text = await dataGetter(url)
  if (text.includes('<title>404 Not Found</title>')) {
    // stupid me
    throw new Error(`${url}: 404`)
  }
  return text
}

const urlToSeq = (url: string) => [
  () => {
    console.log('Fetching with proxy & encoding')
    return tryFetch(url, fetchWithEncoding)
  },
  () => {
    console.log('Trying without proxy or encoding')
    return tryFetch(url, makeRequest)
  },
]

export default async (urls: string[]) => {
  const funcs = flatten(urls.map(urlToSeq))
  try {
    return await tryMultipleAsync(funcs)
  } catch (err) {
    console.error(err)
    throw new Error(`could not load urls ${urls.join(', ')}`)
  }
}
