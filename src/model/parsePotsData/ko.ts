import * as countryNames from 'data/country-names.json'

import KnockoutTeam from 'model/team/KnockoutTeam'

export default (data: string): KnockoutTeam[][] => {
  data = data.slice(data.lastIndexOf('--------------'))
  const pots: KnockoutTeam[][] = [[], []]
  const re = /\s*(.+?)(\s\*+\d?|\([CE]L-TH\)?\s+)?\s{2,}(\w{3})\s+/g
  let matches: RegExpExecArray | null
  for (let i = 0; i < 16 && (matches = re.exec(data)) !== null; ++i) {
    const country = countryNames[matches[3].toLowerCase()]
    pots[i % 2].push(new KnockoutTeam(matches[1], country, i >> 1))
  }
  return pots
}
