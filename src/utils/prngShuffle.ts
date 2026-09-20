import { type PrngGenerator } from './prng';

const BITS_PER_BYTE = 8;

/**
 * The digests taken a bit at a time, most significant first.
 * Spelled out rather than inferred,
 * because TypeScript only infers a never-returning type
 * for function declarations rather than expressions
 */
async function* bitStream(
  prngGenerator: PrngGenerator,
): AsyncGenerator<0 | 1, never, unknown> {
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const { value } = await prngGenerator.next();
    for (const byte of new Uint8Array(value)) {
      for (let shift = BITS_PER_BYTE - 1; shift >= 0; --shift) {
        yield ((byte >> shift) & 1) as 0 | 1;
      }
    }
  }
}

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
  bits: ReturnType<typeof bitStream>;
  bound: number;
}) => {
  let range = 1;
  let value = 0;
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const { value: bit } = await bits.next();
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
  const bits = bitStream(prngGenerator);
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
