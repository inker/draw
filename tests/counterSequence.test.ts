import counterSequence from '#utils/prng/counterSequence';

const take = (byteLength: number, count: number) => {
  const counters = counterSequence(byteLength);
  return Array.from(
    {
      length: count,
    },
    () => [...counters.next().value],
  );
};

// what the counter would be if it were built from a BigInt instead
const bigEndianBytes = (value: bigint, byteLength: number) =>
  Array.from(
    {
      length: byteLength,
    },
    (_, i) => Number((value >> BigInt((byteLength - 1 - i) * 8)) & 0xffn),
  );

describe('counterSequence', () => {
  it('starts at zero', () => {
    expect(take(4, 1)[0]).toEqual([0, 0, 0, 0]);
  });

  it('carries into the byte before it', () => {
    const counters = counterSequence(2);
    for (let i = 0; i < 256; ++i) {
      counters.next();
    }
    expect([...counters.next().value]).toEqual([1, 0]);
  });

  it('counts big-endian whatever the width', () => {
    for (const byteLength of [1, 2, 3, 5, 8, 9, 33]) {
      const counted = take(byteLength, 300);
      const expected = Array.from(
        {
          length: 300,
        },
        (_, i) => bigEndianBytes(BigInt(i), byteLength),
      );
      expect(counted).toEqual(expected);
    }
  });

  it('wraps to zero once every byte has', () => {
    const counted = take(1, 258);
    expect(counted[255]).toEqual([255]);
    expect(counted[256]).toEqual([0]);
    expect(counted[257]).toEqual([1]);
  });

  it('hands out a copy, so a held value does not move underneath', () => {
    const counters = counterSequence(2);
    const held = counters.next().value;
    counters.next();
    counters.next();
    expect([...held]).toEqual([0, 0]);
  });
});
