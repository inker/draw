import { mobile } from 'bowser'

import countryNames from 'data/country-names.json'

import KnockoutTeam from 'model/team/KnockoutTeam'

const getClubName = mobile && import('utils/club-name')

export default async (data: string) => {
  const tokens = data.match(/Round 2 \(\d+? teams\)[\s\S]+?--------([\s\S]+)/)
  if (!tokens || !tokens[1]) {
    throw new Error('incorrect incoming data')
  }
  const substring = tokens[1]
  const pots: KnockoutTeam[][] = [[], []]
  const re = /\s*(.+?)(\s\*+\d?|\([CE]L-TH\)?\s+)?\s{2,}(\w{3})\s+/g
  let matches: RegExpExecArray | null
  for (let i = 0; (matches = re.exec(substring)) !== null; ++i) {
    const name = matches[1].replace(/(@\d|#|\*+|\(TH\))/g, '').trim()
    const country = countryNames[matches[3].toLowerCase()]
    if (!country) {
      break
    }
    const shortName = getClubName && (await getClubName).default(name, country) || undefined
    const group = i < 24 ? i >> 1 : i
    pots[i % 2].push(new KnockoutTeam(name, country, group, shortName))
  }
  return pots
}
