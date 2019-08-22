import { shuffle } from 'lodash'

import getLoopArray from 'utils/getLoopArray'

import list from './list'

const getProxy = getLoopArray(shuffle(list))

export const NUM_PROXIES = list.length

export default (search: string | URLSearchParams) => {
  const proxy = getProxy()
  const urlObj = new URL(proxy)
  urlObj.search = search.toString()
  return urlObj.toString()
}
