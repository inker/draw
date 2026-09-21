import createPrngGenerator, {
  type PrngGenerator,
} from '../src/utils/prng/generator';
import prngShuffle from '../src/utils/prng/shuffle';

// what the app runs on
const COUNTER_BYTE_LENGTH = 4;

const streamOf = (text: string) =>
  createPrngGenerator({
    byteLength: COUNTER_BYTE_LENGTH,
    seed: new TextEncoder().encode(text),
  });

const range = (length: number) => [...new Array(length).keys()];

/**
 * Spelled out rather than inferred,
 * because TypeScript only infers a never-returning type
 * for function declarations rather than expressions
 */
async function* counted(
  prngGenerator: PrngGenerator,
  onPull: () => void,
): PrngGenerator {
  for (;;) {
    const { value } = await prngGenerator.next();
    onPull();
    yield value;
  }
}

describe('prngShuffle', () => {
  it.each([2, 3, 9, 18, 36])(
    'deals the same order it always has: %s',
    async length => {
      const shuffled = await prngShuffle({
        collection: range(length),
        prngGenerator: streamOf('uefa'),
      });
      expect(shuffled).toMatchSnapshot();
    },
  );

  it.each(['uefa', 'UEFA', 'uefb'])('seed: %s', async text => {
    const shuffled = await prngShuffle({
      collection: range(9),
      prngGenerator: streamOf(text),
    });
    expect(shuffled).toMatchSnapshot();
  });

  it.each([0, 1])('leaves nothing to draw for: %s', async length => {
    const collection = range(length);
    const shuffled = await prngShuffle({
      collection,
      prngGenerator: streamOf('uefa'),
    });
    expect(shuffled).toStrictEqual(collection);
  });

  it('returns a permutation at every length up to 300', async () => {
    const prngGenerator = streamOf('uefa');
    for (const length of range(301)) {
      // eslint-disable-next-line no-await-in-loop
      const shuffled = await prngShuffle({
        collection: range(length),
        prngGenerator,
      });
      expect(new Set(shuffled), `length ${length}`).toStrictEqual(
        new Set(range(length)),
      );
      expect(Object.keys(shuffled), `length ${length}`).toHaveLength(length);
    }
  });

  // The stream is deterministic, so this cannot fail on a bad day.
  // A shuffle picking from the whole array each time scores 6,207 here,
  // so a threshold with room to spare still has teeth.
  it('reaches every ordering about equally often', async () => {
    const numOrderings = 24;
    const numTrials = numOrderings * 1000;
    const prngGenerator = streamOf('uefa');
    const counts = new Map<string, number>();

    for (const _ of range(numTrials)) {
      // eslint-disable-next-line no-await-in-loop
      const shuffled = await prngShuffle({
        collection: range(4),
        prngGenerator,
      });
      const ordering = shuffled.join('');
      counts.set(ordering, (counts.get(ordering) ?? 0) + 1);
    }

    const expected = numTrials / numOrderings;
    const chiSquared = counts
      .values()
      .reduce((total, count) => total + (count - expected) ** 2 / expected, 0);

    expect(counts.size).toBe(numOrderings);
    // 1% critical value at 23 degrees of freedom, against 32.2 measured
    expect(chiSquared).toBeLessThan(41.6);
  });

  // A digest per swap would be 143 of them, & the orderings of 144 carry
  // about 830 bits, so four digests is the floor this is measured against.
  it('spends bits close to the entropy of the ordering', async () => {
    let numDigests = 0;
    await prngShuffle({
      collection: range(144),
      prngGenerator: counted(streamOf('uefa'), () => {
        ++numDigests;
      }),
    });
    expect(numDigests).toBeLessThan(10);
  });
});
