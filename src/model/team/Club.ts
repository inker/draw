import { UefaCountry } from 'model/types'

import Team from './index'

export default class Club extends Team {
  shortName?: string
  country: UefaCountry

  constructor(name: string, country: UefaCountry, shortName?: string) {
    super(name)
    this.country = country
    this.shortName = shortName
  }
}
