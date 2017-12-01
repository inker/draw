import clubs from 'data/clubs.json'
import Team from 'model/team'
import { mapValues } from 'lodash'

interface Clubs {
  [country: string]: string[]
}

const mapper = (arr: string[], country: string) =>
  arr.map(clubName => new Team(clubName, country))

export default mapValues(clubs as Clubs, mapper)
