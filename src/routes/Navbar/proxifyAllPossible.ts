import { range } from 'lodash'

import proxify, { NUM_PROXIES } from 'utils/proxify'

export default (url: string) => {
  const params = new URLSearchParams({ url })
  return range(NUM_PROXIES).map(() => proxify(params))
}
