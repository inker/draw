import { useCallback } from 'react'
import { uniqueId } from 'lodash'

import useMappedState from './useMappedState'

export default (prefix?: string) => {
  const mapper = useCallback(() => uniqueId(prefix), [prefix])
  return useMappedState(mapper)
}
