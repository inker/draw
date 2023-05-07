import { type Confederation } from 'model/types'

import Team from '.'

export default class UnknownNationalTeam extends Team {
  readonly coefficient: number
  readonly confederations: Set<Confederation>

  constructor(
    name: string,
    coefficient: number,
    confederations: Confederation[] | Set<Confederation>,
  ) {
    super(name)
    this.coefficient = coefficient
    this.confederations = new Set(confederations)
  }
}
