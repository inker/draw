import { mapValues } from 'lodash'

import clubs from 'data/clubs.json'
import { Country } from 'model/types'
import Team from 'model/team/Club'

interface Clubs {
  [country: string]: string[]
}

const mapper = (arr: string[], country: Country) =>
  arr.map(clubName => new Team(clubName, country))

export default mapValues(clubs as Clubs, mapper)
