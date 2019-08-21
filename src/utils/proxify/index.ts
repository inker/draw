import { shuffle } from 'lodash'

import getLoopArray from 'utils/getLoopArray'
import concatUrlSearch from 'utils/concatUrlSearch'

import list from './list'

const getProxy = getLoopArray(shuffle(list))

export const NUM_PROXIES = list.length

export default (search: string | URLSearchParams) =>
  concatUrlSearch(getProxy(), search)
