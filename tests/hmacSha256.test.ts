import hmacSha256 from '../src/utils/prng/hmacSha256';

describe('hmacSha256', () => {
  // The width is asserted rather than inferred in the module,
  // so the number is written out again here
  // rather than imported from the thing it is checking.
  it('signs to the 32 bytes its type claims', async () => {
    const calcHmacSha256 = await hmacSha256(new Uint8Array([1, 2, 3]));
    const digest = await calcHmacSha256(new Uint8Array([4, 5, 6]));
    expect(digest.byteLength).toBe(32);
  });
});
