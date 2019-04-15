import {
  useState,
  useCallback,
  useEffect,
} from 'react'

export default <State extends { [key: string]: any }>(initialState: State) => {
  type PartialState = Partial<State>
  type StateHookReturnValue = [
    PartialState,
    (partialPopupState: PartialState) => void,
  ]

  let state = initialState
  let listeners: React.Dispatch<State>[] = []

  return (): StateHookReturnValue => {
    const setState = useState<State>(state)[1]

    useEffect(() => {
      listeners.push(setState)
      return () => {
        listeners = listeners.filter(item => item !== setState)
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

    return [state, setStateNew]
  }
}
