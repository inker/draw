import { type UefaCountry } from 'model/types'

import Team from '.'

export default class Club extends Team {
  readonly shortName?: string
  readonly country: UefaCountry

  constructor(
    name: string,
    country: UefaCountry,
    shortName?: string,
  ) {
    super(name)
    this.country = country
    this.shortName = shortName
  }
}
