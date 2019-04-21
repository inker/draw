import { useReducer } from 'react'

import Team from 'model/team'

const initialState: State = []

export const types = Object.freeze({
  add: 'AIRBORNE_TEAMS_ADD',
  remove: 'AIRBORNE_TEAMS_REMOVE',
}) as Readonly<{
  add: 'AIRBORNE_TEAMS_ADD',
  remove: 'AIRBORNE_TEAMS_REMOVE',
}>

type State = Team[]

interface Action {
  type: typeof types.add | typeof types.remove,
  payload: Team,
}

function reducer(airborneTeams: State, action: Action) {
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
