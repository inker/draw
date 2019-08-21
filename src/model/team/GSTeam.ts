import { UefaCountry } from 'model/types'

import Club from './Club'

export default class GSTeam extends Club {
  coefficient: number
  pairing?: GSTeam

  constructor(name: string, country: UefaCountry, coefficient: number, shortName?: string, pairing?: GSTeam) {
    super(name, country, shortName)
    this.coefficient = coefficient
    this.pairing = pairing
  }
}
