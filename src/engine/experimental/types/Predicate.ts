type Predicate<T> = (
  picked: T,
  groupIndex: number,
  currentPotIndex: number,
  groups: T[][],
) => boolean

export default Predicate
