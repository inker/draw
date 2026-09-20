import { type PrngGenerator } from './prng';

const BITS_PER_BYTE = 8;

/**
 * One bit of the stream at a time.
 * Reads are synchronous & only the refill is awaited,
 * because awaiting each bit costs more than the bits it saves.
 * Takes a digest rather than any buffer,
 * because "at least one byte" is not something the type system can state
 */
const makeBitReader = (prngGenerator: PrngGenerator) => {
  let bytes = new Uint8Array(0);
  let nextBit = 0;

  return {
    isExhausted: () => nextBit === bytes.length * BITS_PER_BYTE,

    refill: async () => {
      const { value } = await prngGenerator.next();
      bytes = new Uint8Array(value);
      nextBit = 0;
    },

    read: () => {
      const bit =
        (bytes[Math.floor(nextBit / BITS_PER_BYTE)] >>
          (BITS_PER_BYTE - 1 - (nextBit % BITS_PER_BYTE))) &
        1;
      ++nextBit;
      return bit;
    },
  };
};

type BitReader = ReturnType<typeof makeBitReader>;

/**
 * A uniform integer below `bound`, a bit at a time.
 * Lumbroso's fast dice roller (2013):
 * an overshooting draw is folded into the next rather than discarded,
 * which keeps the cost within two bits of the draw's entropy
 */
const readBelow = async ({
  bitReader,
  bound,
}: {
  bitReader: BitReader;
  bound: number;
}) => {
  let range = 1;
  let value = 0;
  for (;;) {
    if (bitReader.isExhausted()) {
      // eslint-disable-next-line no-await-in-loop
      await bitReader.refill();
    }
    // Doubled rather than shifted:
    // the bitwise operators work in 32 bits & these pass that
    // once a collection passes 2^30, where a double is still exact.
    range *= 2;
    value = value * 2 + bitReader.read();
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
  const bitReader = makeBitReader(prngGenerator);
  const shuffled = [...collection];

  // Fisher-Yates over a bit stream, not a sort key per element:
  // a key costs 64 bits where a tail index needs about 7,
  // & the pairing pool is reshuffled once per club drawn.
  for (let i = shuffled.length - 1; i > 0; --i) {
    // eslint-disable-next-line no-await-in-loop
    const pick = await readBelow({
      bitReader,
      bound: i + 1,
    });
    [shuffled[i], shuffled[pick]] = [shuffled[pick], shuffled[i]];
  }

  return shuffled;
};
