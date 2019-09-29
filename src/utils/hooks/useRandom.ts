import { useCallback } from 'react'

import getRandomId from 'utils/getRandomId'
import useMappedState from './useMappedState'

export default (prefix?: string) => {
  const mapper = useCallback(() => getRandomId(prefix), [prefix])
  return useMappedState(mapper)
}
