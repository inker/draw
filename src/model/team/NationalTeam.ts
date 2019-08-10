import Team from './index'

export type Confederation = 'uefa' | 'afc' | 'caf' | 'conmebol' | 'concacaf' | 'ofc'

export default class NationalTeam extends Team {
  coefficient: number
  confederation: Confederation
  host: boolean
  constructor(name: string, country: string, coefficient: number, confederation: Confederation, host: boolean) {
    super(name, country)
    this.coefficient = coefficient
    this.confederation = confederation
    this.host = host
  }
}
