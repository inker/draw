import bitStream from '../src/utils/prng/bitStream';

/**
 * Spelled out rather than inferred,
 * because TypeScript only infers a never-returning type
 * for function declarations rather than expressions
 */
async function* cycle(
  ...buffers: readonly (readonly number[])[]
): AsyncGenerator<ArrayBuffer, never, unknown> {
  for (;;) {
    for (const bytes of buffers) {
      yield new Uint8Array(bytes).buffer;
    }
  }
}

const take = async (bits: ReturnType<typeof bitStream>, count: number) => {
  const taken: number[] = [];
  while (taken.length < count) {
    // eslint-disable-next-line no-await-in-loop
    const { value } = await bits.next();
    taken.push(value);
  }
  return taken.join('');
};

describe('bitStream', () => {
  it('reads a byte most significant bit first', async () => {
    const bits = bitStream(cycle([0b1000_0001]));
    expect(await take(bits, 8)).toBe('10000001');
  });

  it('runs one buffer straight into the next', async () => {
    const bits = bitStream(cycle([0xff], [0x00]));
    expect(await take(bits, 24)).toBe('111111110000000011111111');
  });

  // Nothing the app deals yields an empty buffer,
  // but a stream that did would starve rather than deal a bit that isn't there.
  it('passes over a buffer with no bytes in it', async () => {
    const bits = bitStream(cycle([], [0b1010_1010]));
    expect(await take(bits, 8)).toBe('10101010');
  });

  it.each([1, 3, 32, 64])('takes a buffer of any width: %s', async width => {
    const bytes = [...new Array(width).keys()].map(index => index % 256);
    const bits = bitStream(cycle(bytes));
    const expected = bytes
      .map(byte => byte.toString(2).padStart(8, '0'))
      .join('');
    expect(await take(bits, width * 8)).toBe(expected);
  });
});
