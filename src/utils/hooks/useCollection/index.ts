import {
  useCallback,
  useMemo,
} from 'react'

import useReducer, { types } from './reducer'

type ReturnType<T> = [
  T[],
  {
    add: (item: T) => void,
    remove: (item: T) => void,
  },
]

export default <T>(): ReturnType<T> => {
  const [state, dispatch] = useReducer<T>()

  const add = useCallback((item: T) => {
    dispatch({
      type: types.add,
      payload: item,
    })
  }, [])

  const remove = useCallback((item: T) => {
    dispatch({
      type: types.remove,
      payload: item,
    })
  }, [])

  const actions = useMemo(() => ({
    add,
    remove,
  }), [])

  return [state, actions]
}
