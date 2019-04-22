import {
  useCallback,
  useMemo,
} from 'react'
import delay from 'delay.js'

import useLongCalculatingReducer, { types } from './useTimeoutReducer'

type ReturnType<T> = [
  boolean,
  {
    set: (oldValue: T) => Promise<void>,
    reset: () => void,
  }
]

export default <T>(delayMs: number): ReturnType<T> => {
  const [longCalculating, dispatchLongCalculating] = useLongCalculatingReducer<T>()

  const runCalculatingTimer = useCallback(async (oldValue: T) => {
    dispatchLongCalculating({
      type: types.set,
      payload: oldValue,
    })
    await delay(delayMs)
    dispatchLongCalculating({
      type: types.set,
      payload: oldValue,
    })
  }, [])

  const resetLongCalculating = useCallback(() => {
    dispatchLongCalculating({
      type: types.reset,
    })
  }, [])

  const actions = useMemo(() => ({
    set: runCalculatingTimer,
    reset: resetLongCalculating,
  }), [])

  return [longCalculating.isLong, actions]
}
