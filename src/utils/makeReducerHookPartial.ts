import { useCallback } from 'react'

import makeReducerHook from 'utils/makeReducerHook'

export default <State extends { [key: string]: any }>(initialState: State) => {
  const use = makeReducerHook(initialState)

  return () => {
    const [state, overwriteState] = use()

    const setStateNew = useCallback((diff: Partial<State>) => {
      overwriteState({
        ...state,
        ...diff,
      })
    }, [state, overwriteState])

    return [state, setStateNew] as const
  }
}
