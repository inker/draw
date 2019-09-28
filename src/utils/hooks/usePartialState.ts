import {
  useState,
  useCallback,
} from 'react'

export default <State extends { [key: string]: any }>(initialState: State) => {
  const [state, setState] = useState<State>(initialState)

  const setStateNew = useCallback((partial: Partial<State>) => {
    setState({
      ...state,
      ...partial,
    })
  }, [state])

  return [state, setStateNew] as const
}
