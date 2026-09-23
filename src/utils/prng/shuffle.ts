import buffersToBits from '../buffersToBits';

import { type PrngGenerator } from './generator';

/**
 * A uniform integer below `bound`, a bit at a time.
 * Lumbroso's fast dice roller (2013):
 * an overshooting draw is folded into the next rather than discarded,
 * which keeps the cost within two bits of the draw's entropy
 */
const readBelow = async ({
  bits,
  bound,
}: {
  bits: AsyncIterator<0 | 1, void>;
  bound: number;
}) => {
  let range = 1;
  let value = 0;
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const { value: bit, done } = await bits.next();
    if (done) {
      // Every tie has to be broken for the draw to be a draw,
      // so a stream that ends mid-pick cannot be finished later
      // & the bits already read have to be thrown away with it.
      throw new Error('Ran out of randomness mid-shuffle');
    }
    // Doubled rather than shifted:
    // the bitwise operators work in 32 bits & these pass that
    // once a collection passes 2^30, where a double is still exact.
    range *= 2;
    value = value * 2 + bit;
    if (range >= bound) {
      if (value < bound) {
        return value;
      }
      range -= bound;
      value -= bound;
    }
  }
};

export default async <T>({
  collection,
  prngGenerator,
}: {
  collection: Iterable<T>;
  prngGenerator: PrngGenerator;
}) => {
  const bits = buffersToBits(prngGenerator);
  const shuffled = [...collection];

  // Fisher-Yates over a bit stream, not a sort key per element:
  // a key costs 64 bits where a tail index needs about 7,
  // & the pairing pool is reshuffled once per club drawn.
  for (let i = shuffled.length - 1; i > 0; --i) {
    // eslint-disable-next-line no-await-in-loop
    const pick = await readBelow({
      bits,
      bound: i + 1,
    });
    [shuffled[i], shuffled[pick]] = [shuffled[pick], shuffled[i]];
  }

  return shuffled;
};
