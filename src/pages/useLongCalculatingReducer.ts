import { useReducer } from 'react'

import Team from 'model/team'

const initialState: State = {
  team: null,
  isLong: false,
}

export const types = Object.freeze({
  set: 'LONG_CALCULATING_SET',
  reset: 'LONG_CALCULATING_RESET',
}) as Readonly<{
  set: 'LONG_CALCULATING_SET',
  reset: 'LONG_CALCULATING_RESET',
}>

interface State {
  team: Team | null,
  isLong: boolean,
}

type Action = {
  type: typeof types.set,
  payload: Team,
} | {
  type: typeof types.reset,
}

function reducer(state: State, action: Action) {
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

export default () =>
  useReducer(reducer, initialState)
