import Team from './index'

export default class GSTeam extends Team {
  coefficient: number
  pairing?: GSTeam
  constructor(name: string, country: string, coefficient: number, shortName?: string, pairing?: GSTeam) {
    super(name, country, shortName)
    this.coefficient = coefficient
    this.pairing = pairing
  }
}
