import { mapValues } from 'lodash'

import clubs from 'data/clubs.json'
import { UefaCountry } from 'model/types'
import Team from 'model/team/Club'

interface Clubs {
  [country: string]: string[]
}

const mapper = (arr: string[], country: UefaCountry) =>
  arr.map(clubName => new Team(clubName, country))

export default mapValues(clubs as Clubs, mapper)
