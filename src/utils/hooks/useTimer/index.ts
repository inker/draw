import { useMemo } from 'react'
import delay from 'delay.js'

import useReducer, { types } from './reducer'

export default <T>(delayMs: number) => {
  const [state, dispatch] = useReducer<T>()

  const runCalculatingTimer = async (oldValue: T) => {
    dispatch({
      type: types.set,
      payload: oldValue,
    })
    await delay(delayMs)
    dispatch({
      type: types.set,
      payload: oldValue,
    })
  }

  const resetLongCalculating = () => {
    dispatch({
      type: types.reset,
    })
  }

  const actions = useMemo(() => ({
    set: runCalculatingTimer,
    reset: resetLongCalculating,
  }), [])

  return [state.isTimedOut, actions] as const
}
