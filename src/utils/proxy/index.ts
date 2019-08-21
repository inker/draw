import { shuffle } from 'lodash'

import concatUrlSearch from 'utils/concatUrlSearch'
import makeRequest from 'utils/makeRequest'

import list from './list'
import getSearch from './getSearch'

export default async (url: string, encoding: string) => {
  const search = getSearch(url, encoding)

  for (const proxy of shuffle(list)) {
    const newUrl = concatUrlSearch(proxy, search)
    try {
      return await makeRequest(newUrl)
    } catch (err) {
      console.error(err)
    }
  }

  throw new Error(`could not load url ${url}`)
}
