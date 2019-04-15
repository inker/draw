import {
  useState,
  useCallback,
} from 'react'

type Return<T> = [
  T,
  (p: Partial<T>) => void,
]

export default <State extends { [key: string]: any }>(initialState: State): Return<State> => {
  const [state, setState] = useState<State>(initialState)

  const setStateNew = useCallback((partial: Partial<State>) => {
    setState({
      ...state,
      ...partial,
    })
  }, [state])

  return [state, setStateNew]
}
