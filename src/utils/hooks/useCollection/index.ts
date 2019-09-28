import { useMemo } from 'react'

import useReducer, { types } from './reducer'

export default <T>() => {
  const [state, dispatch] = useReducer<T>()

  const add = (item: T) => {
    dispatch({
      type: types.add,
      payload: item,
    })
  }

  const remove = (item: T) => {
    dispatch({
      type: types.remove,
      payload: item,
    })
  }

  const actions = useMemo(() => ({
    add,
    remove,
  }), [])

  return [state, actions] as const
}
