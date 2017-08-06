import Team from './Team'

export default class Last16Team extends Team {
  group: number
  constructor(name: string, country: string, group: number) {
    super(name, country)
    this.group = group
  }
}
