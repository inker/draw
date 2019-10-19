import { UefaCountry } from 'model/types'

import Club from './Club'

export default class KnockoutTeam extends Club {
  group: number

  constructor(
    name: string,
    country: UefaCountry,
    group: number,
    shortName?: string,
  ) {
    super(name, country)
    this.group = group
    this.shortName = shortName
  }
}
