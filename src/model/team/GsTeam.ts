import { type UefaCountry } from 'model/types'

import Club from './Club'

export default class GsTeam extends Club {
  readonly coefficient: number
  // eslint-disable-next-line no-use-before-define
  pairing?: GsTeam

  // eslint-disable-next-line max-params
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
