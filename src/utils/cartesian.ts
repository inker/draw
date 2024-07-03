export default <A, B>(a: Iterable<A>, b: Iterable<B>) => {
  const result: [A, B][] = [];
  for (const i of a) {
    for (const j of b) {
      result.push([i, j]);
    }
  }
  return result;
};
