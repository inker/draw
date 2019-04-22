import { useReducer } from 'react'

const initialState = {
  team: null,
  isLong: false,
}

export const types = Object.freeze({
  set: 'TIMEOUT_VALUE_SET',
  reset: 'TIMEOUT_RESET',
}) as Readonly<{
  set: 'TIMEOUT_VALUE_SET',
  reset: 'TIMEOUT_RESET',
}>

interface State<T> {
  team: T | null,
  isLong: boolean,
}

type Action<T> = {
  type: typeof types.set,
  payload: T,
} | {
  type: typeof types.reset,
}

function reducer<T>(state: State<T>, action: Action<T>) {
  switch (action.type) {
    case types.set:
      return {
        team: action.payload,
        isLong: !!action.payload && action.payload === state.team,
      }

    case types.reset:
      return initialState

    default:
      throw new Error(`Unknown action: ${action}`)
  }
}

type Reducer<T> = (collection: State<T>, action: Action<T>) => State<T>

export default <T>() =>
  useReducer<Reducer<T>>(reducer, initialState)
