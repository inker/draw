const BITS_PER_BYTE = 8;

/**
 * Hands back integers of any bit width from the stream,
 * keeping the leftover bits of a byte for the next read
 * so a caller only spends the bits it asks for
 */
const makeBitReader = (
  prngGenerator: AsyncGenerator<ArrayBuffer, never, unknown>,
) => {
  let bytes = new Uint8Array(0);
  let nextByte = 0;
  let buffer = 0;
  let numBufferedBits = 0;

  return async (numBits: number) => {
    while (numBufferedBits < numBits) {
      if (nextByte === bytes.length) {
        // eslint-disable-next-line no-await-in-loop
        const { value } = await prngGenerator.next();
        bytes = new Uint8Array(value);
        nextByte = 0;
      }
      // Multiplied rather than shifted:
      // the buffer outgrows the 32 bits the bitwise operators work in.
      buffer = buffer * 2 ** BITS_PER_BYTE + bytes[nextByte];
      ++nextByte;
      numBufferedBits += BITS_PER_BYTE;
    }

    numBufferedBits -= numBits;
    const divisor = 2 ** numBufferedBits;
    const value = Math.floor(buffer / divisor);
    buffer -= value * divisor;
    return value;
  };
};

export default async <T>({
  array,
  prngGenerator,
}: {
  array: readonly T[];
  prngGenerator: AsyncGenerator<ArrayBuffer, never, unknown>;
}) => {
  const readBits = makeBitReader(prngGenerator);
  const shuffled = [...array];

  // Fisher-Yates over a bit reader rather than a sort key per element:
  // a key costs 64 bits where an index into the unshuffled tail needs about 9,
  // & the pairing pool is reshuffled once per club drawn.
  for (let i = shuffled.length - 1; i > 0; --i) {
    const numBits = 32 - Math.clz32(i);
    // Redrawn rather than reduced modulo i + 1,
    // which would hand the low indices an extra chance.
    let pick = i + 1;
    while (pick > i) {
      // eslint-disable-next-line no-await-in-loop
      pick = await readBits(numBits);
    }
    [shuffled[i], shuffled[pick]] = [shuffled[pick], shuffled[i]];
  }

  return shuffled;
};
