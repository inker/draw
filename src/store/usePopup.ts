import {
  useState,
  useCallback,
  useEffect,
} from 'react'

interface State {
  initial: boolean,
  waiting: boolean,
  error: string | null,
}

type PartialState = Partial<State>
type StateHookReturnValue = [
  PartialState,
  (partialPopupState: PartialState) => void,
]

let listeners: React.Dispatch<State>[] = []
let state: State = {
  initial: true,
  waiting: true,
  error: null,
}

export default (): StateHookReturnValue => {
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
