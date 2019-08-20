import delay from 'delay.js'
import { shuffle } from 'lodash'

import concatUrlSearch from 'utils/concatUrlSearch'

import list from './list'

export default async (url: string, encoding: string) => {
  while (!navigator.onLine) {
    console.error("you're offline, retrying...")
    await delay(250)
  }

  const searchParams = new URLSearchParams()
  searchParams.set('url', url)
  if (encoding) {
    searchParams.set('encoding', encoding)
  }
  const search = searchParams.toString()

  for (const proxy of shuffle(list)) {
    const newUrl = concatUrlSearch(proxy, search)
    try {
      const response = await fetch(newUrl)
      if (response.status !== 200) {
        throw new Error(`${url}: ${response.status}`)
      }
      return response.text()
    } catch (err) {
      console.error(err)
    }
  }

  throw new Error(`could not load url ${url}`)
}
