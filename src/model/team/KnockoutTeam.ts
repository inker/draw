import Team from './index'

export default class KnockoutTeam extends Team {
  group: number
  constructor(name: string, country: string, group: number, shortName?: string) {
    super(name, country)
    this.group = group
    this.shortName = shortName
  }
}
