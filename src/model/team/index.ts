import { uniqueId } from 'lodash'

export default class Team {
  id = uniqueId('team-')
  name: string

  constructor(name: string) {
    this.name = name
  }
}
