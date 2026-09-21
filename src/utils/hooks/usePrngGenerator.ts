import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useDrawId from '#store/useDrawId';
import useDidUpdate from '#utils/hooks/useDidUpdate';
import createPrngGenerator from '#utils/prng/generator';

/**
 * More entropy than there are orderings of anything being drawn
 */
const SEED_BYTE_LENGTH = 32;

/**
 * The counter under the digests, wide enough to outlast any draw.
 * Part of what the stream deals,
 * so widening it makes every shared seed deal a different draw
 */
const COUNTER_BYTE_LENGTH = 4;

const toSeed = (str: string | null) => {
  if (str) {
    try {
      return Uint8Array.fromBase64(str, {
        alphabet: 'base64url',
      });
    } catch {
      // swallow
    }
  }
  return globalThis.crypto.getRandomValues(new Uint8Array(SEED_BYTE_LENGTH));
};

const startStream = (str: string | null) => {
  const seed = toSeed(str);
  return {
    seed,
    generator: createPrngGenerator({
      byteLength: COUNTER_BYTE_LENGTH,
      seed,
    }),
  };
};

/**
 * The one stream a draw is dealt from, restarted whenever the draw is.
 * In state rather than a memo,
 * which React may throw away & so deal the draw a second time
 */
export default () => {
  const [searchParam] = useSearchParams();
  const seedParam = searchParam.get('seed');
  const [drawId] = useDrawId();

  const [prng, setStream] = useState(() => startStream(seedParam));

  // Not on mount, or the stream is replaced on the render right after it starts.
  useDidUpdate(() => {
    setStream(startStream(seedParam));
  }, [seedParam, drawId]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      'seed:',
      prng.seed.toBase64({
        alphabet: 'base64url',
        omitPadding: true,
      }),
    );
  }, [prng.seed]);

  return prng.generator;
};
