import { useCallback } from 'react'
import { uniqueId } from 'lodash'

import makeStoreHook from 'utils/makeStoreHook'

const useStore = makeStoreHook(uniqueId('draw-'))

export default () => {
  const [state, setState] = useStore()
  const setDrawId = useCallback(() => {
    setState(uniqueId('draw-'))
  }, [])
  return [state, setDrawId] as const
}
