import Team from './index'

export default class NationalTeam extends Team {
  coefficient: number
  confederation: string
  constructor(name: string, country: string, coefficient: number, confederation: string) {
    super(name, country)
    this.coefficient = coefficient
    this.confederation = confederation
  }
}
