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
  if (!predicate(picked, groups, groupIndex)) {
    return false
  }

  // If there are no empty items remaining, do not continue, just return true
  if (source.length === 0) {
    return true
  }

  // Otherwise, continue
  // The predicate returned true, so group `groupIndex` is good
  // Put the picked item into it
  const newGroups = groups.with(groupIndex, [picked, ...groups[groupIndex]])

  // Next, pick the head item from the current pot
  const [newPicked, ...newSource] = source

  // Determine if the picked item can be put into any group
  return newGroups.some((_, i) =>
    anyGroupPossible(newSource, newGroups, newPicked, i, predicate),
  )
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
