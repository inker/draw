import { uniqueId } from 'lodash'

export default class Team {
  id = uniqueId('team-')
  name: string
  country: string
  constructor(name: string, country: string) {
    this.name = name
    this.country = country
  }
}
