import { useReducer } from 'react'

const initialState = []

export const types = {
  add: 'COLLECTION_ADD',
  remove: 'COLLECTION_REMOVE',
} as const

type State<T> = T[]

interface Action<T> {
  type: typeof types.add | typeof types.remove,
  payload: T,
}

function reducer<T>(state: State<T>, action: Action<T>) {
  switch (action.type) {
    case types.add:
      return [...state, action.payload]
    case types.remove:
      return state.filter(t => t !== action.payload)
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

type Reducer<T> = (collection: State<T>, action: Action<T>) => State<T>

export default <T>() =>
  useReducer<Reducer<T>>(reducer, initialState)
