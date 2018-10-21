export default <T, Acc>(
  predicate: (acc: Acc, val: T) => boolean,
  reducer: (acc: Acc, val: T) => Acc,
  initialValue: Acc,
  collection: Iterable<T>,
) => {
  let res = initialValue
  for (const item of collection) {
    if (!predicate(res, item)) {
      break
    }
    res = reducer(res, item)
  }
  return res
}
