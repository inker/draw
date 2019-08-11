import { Country } from 'model/types'

import Team from './index'

export default class Club extends Team {
  shortName?: string
  country: Country

  constructor(name: string, country: Country, shortName?: string) {
    super(name)
    this.country = country
    this.shortName = shortName
  }
}
