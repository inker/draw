import {
  useState,
  useCallback,
  useEffect,
} from 'react'

import {
  pull,
} from 'lodash'

export default <State extends { [key: string]: any }>(initialState: State) => {
  type PartialState = Partial<State>

  let state = initialState
  const listeners: React.Dispatch<State>[] = []

  return () => {
    const setState = useState<State>(state)[1]

    useEffect(() => {
      listeners.push(setState)
      return () => {
        pull(listeners, setState)
      }
    }, [])

    const setStateNew = useCallback((diff: PartialState) => {
      state = {
        ...state,
        ...diff,
      }
      for (const listener of listeners) {
        listener(state)
      }
    }, [state, listeners])

    return [state, setStateNew] as const
  }
}
