import * as countryNames from 'data/country-names.json'

import KnockoutTeam from 'model/team/KnockoutTeam'

export default (data: string): KnockoutTeam[][] => {
  data = data.slice(data.lastIndexOf('--------------'))
  const pots: KnockoutTeam[][] = [[], []]
  const re = /\s*(.+?)(\s\*+\d?|\([CE]L-TH\)?\s+)?\s{2,}(\w{3})\s+/g
  let matches: RegExpExecArray | null
  for (let i = 0; (matches = re.exec(data)) !== null; ++i) {
    const name = matches[1].replace(/(@\d|#|\*+)/g, '').trim()
    const country = countryNames[matches[3].toLowerCase()]
    if (!country) {
      break
    }
    pots[i % 2].push(new KnockoutTeam(name, country, i >> 1))
  }
  return pots
}
