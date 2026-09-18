import { orderBy } from 'lodash';

export default async <T>({
  array,
  prngGenerator,
}: {
  array: readonly T[];
  prngGenerator: AsyncGenerator<ArrayBuffer, never, unknown>;
}) => {
  // Each digest is 32 bytes & a sort key is 8,
  // so one round of the stream covers four elements.
  const sortKeys: bigint[] = [];
  while (sortKeys.length < array.length) {
    // eslint-disable-next-line no-await-in-loop
    const { value } = await prngGenerator.next();
    const view = new DataView(value);
    for (let offset = 0; offset + 8 <= value.byteLength; offset += 8) {
      sortKeys.push(view.getBigUint64(offset, false));
    }
  }

  // Keyed by position rather than by element,
  // so equal or repeated elements still get a key each.
  return orderBy(
    array.map((value, i) => ({
      value,
      sortKey: sortKeys[i],
    })),
    entry => entry.sortKey,
  ).map(entry => entry.value);
};
