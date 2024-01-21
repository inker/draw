import { backtrackFirstSolution } from '#utils/backtrack'

type ReadonlyDoubleArray<T> = readonly (readonly T[])[]

export type Predicate<T> = (
  picked: T,
  groups: ReadonlyDoubleArray<T>,
  groupIndex: number,
) => boolean

// eslint-disable-next-line max-params
function anyGroupPossible<T>(
  source: readonly T[],
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  groupIndex: number,
  predicate: Predicate<T>,
): boolean {
  const solution = backtrackFirstSolution(
    {
      source,
      groups,
      picked,
      groupIndex,
    },
    {
      reject: c => !predicate(c.picked, c.groups, c.groupIndex),
      accept: c => c.source.length === 0,
      generate: c => {
        const newGroups = c.groups.with(c.groupIndex, [
          c.picked,
          ...c.groups[c.groupIndex],
        ])
        const [newPicked, ...newSource] = c.source
        return newGroups.map((_, i) => ({
          source: newSource,
          groups: newGroups,
          picked: newPicked,
          groupIndex: i,
        }))
      },
    },
  )
  return solution !== undefined
}

interface Input<T> {
  pots: ReadonlyDoubleArray<T>
  groups: ReadonlyDoubleArray<T>
  picked: T
  predicate: Predicate<T>
}

export const allPossibleGroups = <T>({
  pots,
  groups,
  picked,
  predicate,
}: Input<T>) => {
  const source = pots.flat()
  return groups
    .map((_, i) => i)
    .filter(i => anyGroupPossible(source, groups, picked, i, predicate))
}

export const firstPossibleGroup = <T>({
  pots,
  groups,
  picked,
  predicate,
}: Input<T>) => {
  const source = pots.flat()
  return groups.findIndex((_, i) =>
    anyGroupPossible(source, groups, picked, i, predicate),
  )
}
