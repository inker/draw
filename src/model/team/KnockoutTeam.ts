import { Country } from 'model/types'

import Club from './Club'

export default class KnockoutTeam extends Club {
  group: number
  constructor(name: string, country: Country, group: number, shortName?: string) {
    super(name, country)
    this.group = group
    this.shortName = shortName
  }
}
