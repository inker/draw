import { useReducer } from 'react'

import Team from 'model/team'

interface Action<T> {
  type: string,
  payload: T,
}

const initialState: Team[] = []

export const types = Object.freeze({
  add: 'AIRBORNE_TEAMS_ADD',
  remove: 'AIRBORNE_TEAMS_REMOVE',
})

function reducer<T extends Team>(airborneTeams: T[], action: Action<T>) {
  switch (action.type) {
    case types.add:
      return [...airborneTeams, action.payload]
    case types.remove:
      return airborneTeams.filter(t => t !== action.payload)
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export default () =>
  useReducer(reducer, initialState)
