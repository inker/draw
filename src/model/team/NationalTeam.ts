import Team from './index'

export default class NationalTeam extends Team {
  coefficient: number
  confederation: string
  host: boolean
  constructor(name: string, country: string, coefficient: number, confederation: string, host: boolean) {
    super(name, country)
    this.coefficient = coefficient
    this.confederation = confederation
    this.host = host
  }
}
