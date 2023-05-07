import { type Confederation } from 'model/types'

import Team from '.'

export default class NationalTeam extends Team {
  readonly coefficient: number
  readonly confederation: Confederation
  readonly host: boolean

  constructor(
    name: string,
    coefficient: number,
    confederation: Confederation,
    host: boolean,
  ) {
    super(name)
    this.coefficient = coefficient
    this.confederation = confederation
    this.host = host
  }
}
