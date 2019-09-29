import {
  useState,
  useCallback,
} from 'react'

export default <State>(mapper: () => State) => {
  const [state, setState] = useState(mapper())
  const setMappedState = useCallback(() => {
    setState(mapper())
  }, [mapper])
  return [state, setMappedState] as const
}
