import Last16Team from 'model/team/Last16Team'

export default (data: string): Last16Team[][] => {
  data = data.slice(data.lastIndexOf('--------------'))
  const pots: Last16Team[][] = [[], []]
  const re = /\s*(.+?)(\s\*+\d?|\([CE]L-TH\)?\s+)?\s{2,}(\w{3})\s+/g
  let matches: RegExpExecArray | null
  for (let i = 0; i < 16 && (matches = re.exec(data)) !== null; ++i) {
    pots[i % 2].push(new Last16Team(matches[1], matches[3], i >> 1))
  }
  return pots
}
