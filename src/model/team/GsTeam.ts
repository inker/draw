import { UefaCountry } from 'model/types'

import Club from './Club'

export default class GsTeam extends Club {
  readonly coefficient: number
  pairing?: GsTeam

  constructor(
    name: string,
    country: UefaCountry,
    coefficient: number,
    shortName?: string,
    pairing?: GsTeam,
  ) {
    super(name, country, shortName)
    this.coefficient = coefficient
    this.pairing = pairing
  }
}
