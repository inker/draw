import { chunk } from 'lodash'

import countries from 'data/countries'

import NationalTeam from 'model/team/NationalTeam'
import UnknownNationalTeam from 'model/team/UnknownNationalTeam'

const countryNameToTeam = (host: boolean) =>
  (c: string) => {
    const ctr = countries[c as keyof typeof countries]
    return ctr
      ? new NationalTeam(c, 0, ctr.confederation, host)
      // @ts-expect-error
      : new UnknownNationalTeam(c, 0, c.split('/'))
  }

const makeHost = countryNameToTeam(true)
const makeNonHost = countryNameToTeam(false)

export default (hosts: readonly string[], rest: readonly string[]) => {
  const teams = [
    ...hosts.map(makeHost),
    ...rest.map(makeNonHost),
  ]
  return chunk(teams, 8)
}
