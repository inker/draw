import reduceWhile from 'utils/reduceWhile'

type Predicate<T> = (i: T) => boolean

const reduceDidComplete = <T, Acc>(
  predicate: Predicate<Acc>,
  reducer: (acc: Acc, val: T) => Acc,
  initialValue: Acc,
  collection: Iterable<T>,
) => predicate(reduceWhile(predicate, reducer, initialValue, collection))

export default (n: number) =>
  <T>(collection: Iterable<T>, pred: Predicate<T>) =>
    reduceDidComplete(acc => acc < n, (acc, item) => pred(item) ? acc + 1 : acc, 0, collection)
