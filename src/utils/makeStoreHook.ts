import {
  useState,
  useCallback,
  useEffect,
} from 'react'

import {
  pull,
} from 'lodash'

export default <S>(initialState: S | (() => S)) => {
  let state = initialState instanceof Function
    ? initialState()
    : initialState
  const listeners: React.Dispatch<React.SetStateAction<S>>[] = []

  return () => {
    const setState = useState<S>(state)[1]

    useEffect(() => {
      listeners.push(setState)
      return () => {
        pull(listeners, setState)
      }
    }, [])

    const setStateNew = useCallback((newValue: React.SetStateAction<S>) => {
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
