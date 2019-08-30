import Team from 'model/team/GsTeam'
import { UefaCountry } from 'model/types'

const big5: UefaCountry[] = [
  'England',
  'Spain',
  'Germany',
  'Italy',
  'France',
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (season: number) =>
  // eslint-disable-next-line unicorn/consistent-function-scoping
  (team: Team) =>
    big5.includes(team.country)
