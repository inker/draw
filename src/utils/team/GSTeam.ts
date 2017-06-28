import Team from './Team'

export default class GSTeam extends Team {
  coefficient: number
  pairing?: GSTeam
  constructor(name: string, country: string, coefficient: number, pairing?: GSTeam) {
    super(name, country)
    this.coefficient = coefficient
    this.pairing = pairing
  }
}
