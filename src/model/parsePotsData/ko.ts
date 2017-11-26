import * as countryNames from 'data/country-names.json'

import KnockoutTeam from 'model/team/KnockoutTeam'

export default (data: string): KnockoutTeam[][] => {
  data = data.slice(data.lastIndexOf('Round 2 ('))
  const pots: KnockoutTeam[][] = [[], []]
  const re = /\s*(.+?)(\s\*+\d?|\([CE]L-TH\)?\s+)?\s{2,}(\w{3})\s+/g
  let matches: RegExpExecArray | null
  for (let i = 0; (matches = re.exec(data)) !== null; ++i) {
    const name = matches[1].replace(/(@\d|#|\*+|\(TH\))/g, '').trim()
    const country = countryNames[matches[3].toLowerCase()]
    if (!country) {
      break
    }
    const group = i < 24 ? i >> 1 : i
    pots[i % 2].push(new KnockoutTeam(name, country, group))
  }
  return pots
}
