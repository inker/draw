import createPrngGenerator from '#utils/prng/generator';

const toHex = (digest: ArrayBuffer) =>
  [...new Uint8Array(digest)]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');

const seedOf = (text: string) => new TextEncoder().encode(text);

// More than one batch of digests,
// so a snapshot also pins the stream across a batch boundary.
const NUM_DIGESTS = 20;

const take = async (
  options: Parameters<typeof createPrngGenerator>[0],
  count = NUM_DIGESTS,
) => {
  const digests: string[] = [];
  for await (const digest of createPrngGenerator(options)) {
    digests.push(toHex(digest));
    if (digests.length === count) {
      break;
    }
  }
  return digests;
};

describe('prng', () => {
  describe.each([1, 4, 8, 33])('byteLength: %s', byteLength => {
    it('deals the same stream it always has', async () => {
      const digests = await take({
        byteLength,
        seed: seedOf('uefa'),
      });
      expect(digests).toMatchSnapshot();
    });
  });

  it.each(['uefa', 'UEFA', 'uefb'])('seed: %s', async text => {
    const digests = await take(
      {
        byteLength: 4,
        seed: seedOf(text),
      },
      4,
    );
    expect(digests).toMatchSnapshot();
  });

  // An empty ?seed= falls back to random bytes before it reaches here,
  // so this is the module's own boundary rather than a reachable state.
  it('refuses a seed with no bytes in it', async () => {
    await expect(
      take(
        {
          byteLength: 4,
          seed: new Uint8Array(0),
        },
        1,
      ),
    ).rejects.toThrow('Zero-length key is not supported');
  });

  it('replays a seed', async () => {
    const options = {
      byteLength: 4,
      seed: seedOf('uefa'),
    };
    expect(await take(options)).toEqual(await take(options));
  });

  it('deals differently for a seed one bit apart', async () => {
    const first = await take({
      byteLength: 4,
      seed: new Uint8Array([0]),
    });
    const second = await take({
      byteLength: 4,
      seed: new Uint8Array([1]),
    });
    expect(first).not.toEqual(second);
  });

  it('deals differently for each counter width', async () => {
    const forWidth = async (byteLength: number) =>
      take({
        byteLength,
        seed: seedOf('uefa'),
      });
    expect(await forWidth(4)).not.toEqual(await forWidth(8));
  });

  it('hands back the generator without awaiting it', () => {
    const prngGenerator = createPrngGenerator({
      byteLength: 4,
      seed: seedOf('uefa'),
    });
    expect(prngGenerator[Symbol.asyncIterator]()).toBe(prngGenerator);
  });

  it('signs 32 bytes a pull', async () => {
    const [digest] = await take(
      {
        byteLength: 4,
        seed: seedOf('uefa'),
      },
      1,
    );
    expect(digest).toHaveLength(64);
  });
});
