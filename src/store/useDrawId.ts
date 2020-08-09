import { useCallback } from 'react'
import { uniqueId } from 'lodash'

import makeReducerHook from 'utils/makeReducerHook'

const useStore = makeReducerHook(uniqueId('draw-'))

export default () => {
  const [state, setState] = useStore()
  const setDrawId = useCallback(() => {
    setState(uniqueId('draw-'))
  }, [setState])
  return [state, setDrawId] as const
}
