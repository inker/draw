import {
  compact,
  shuffle,
} from 'lodash'

import getLoopArray from 'utils/getLoopArray'

import listRaw from './list.txt'

const list = compact(listRaw.split('\n'))

const getProxy = getLoopArray(shuffle(list))

export const NUM_PROXIES = list.length

export default (search: string | URLSearchParams) => {
  const proxy = getProxy()
  const urlObj = new URL(proxy)
  urlObj.search = search.toString()
  return urlObj.toString()
}
