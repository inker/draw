import type { UefaCountry } from 'model/types'
import KnockoutTeam from 'model/team/KnockoutTeam'

import getClubName from 'utils/club-name'
import codeToCountryName from 'utils/codeToCountryName'

const TEXT_RE = /Round 2 \(\d+? teams\)[\S\s]+?-{8}([\S\s]+)/
const LINE_RE = /\s*(.+?)(\s\*+\d?|\([CE]L-TH\)?\s+)?\s{2,}(\w{3})\s+/g

export default async (data: string) => {
  const tokens = data.match(TEXT_RE)
  if (!tokens?.[1]) {
    throw new Error('incorrect incoming data')
  }

  const substring = tokens[1].replace(/\*/g, ' ')
  const pots: KnockoutTeam[][] = [[], []]

  for (const [i, matches] of Array.from(substring.matchAll(LINE_RE)).entries()) {
    const name = matches[1].replace(/(@\d|#|\*+|\(TH\))/g, '').trim()
    const country = codeToCountryName(matches[3].toLowerCase()) as UefaCountry
    if (!country) {
      break
    }
    const shortName = getClubName(name, country) || undefined
    const group = i < 24 ? i >> 1 : i
    pots[i % 2].push(new KnockoutTeam(name, country, group, shortName))
  }

  return pots
}
