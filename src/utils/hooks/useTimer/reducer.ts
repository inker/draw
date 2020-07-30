import { useReducer } from 'react'

const initialState = {
  key: null,
  isTimedOut: false,
}

export const types = {
  set: 'TIMEOUT_VALUE_SET',
  reset: 'TIMEOUT_RESET',
} as const

interface State<T> {
  key: T | null,
  isTimedOut: boolean,
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
        key: action.payload,
        isTimedOut: !!action.payload && action.payload === state.key,
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
