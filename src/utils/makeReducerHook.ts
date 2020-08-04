import {
  useState,
  useCallback,
  useEffect,
} from 'react'

import {
  pull,
} from 'lodash'

type StateSet<T> = (state: T) => T

export default <State>(initialState: State | (() => State)) => {
  let state = initialState instanceof Function
    ? initialState()
    : initialState
  const listeners: React.Dispatch<State>[] = []

  return () => {
    const setState = useState<State>(state)[1]

    useEffect(() => {
      listeners.push(setState)
      return () => {
        pull(listeners, setState)
      }
    }, [])

    const setStateNew = useCallback((newValue: State | StateSet<State>) => {
      state = newValue instanceof Function
        ? newValue(state)
        : newValue
      for (const listener of listeners) {
        listener(state)
      }
    }, [state, listeners])

    return [state, setStateNew] as const
  }
}
