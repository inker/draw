import { uniqueId } from 'lodash'

export default class Team {
  id = uniqueId('team-')
  name: string
  shortName?: string
  country: string
  constructor(name: string, country: string, shortName?: string) {
    this.name = name
    this.country = country
    this.shortName = shortName
  }
}
