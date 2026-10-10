import { useEffect, useState } from 'react';
import { useRouter } from '@tanstack/react-router';

import drawRouteApi from '#routes/routeApi';
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

const toSeed = (str: string | undefined) => {
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

const initStream = (str: string | undefined) => {
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
  const seedParam = drawRouteApi.useSearch({
    select: search => search.seed,
  });
  const [drawId] = useDrawId();

  const [prng, setStream] = useState(() => initStream(seedParam));

  // Not on mount, or the stream is replaced on the render right after it starts.
  useDidUpdate(() => {
    setStream(initStream(seedParam));
  }, [seedParam, drawId]);

  const router = useRouter();
  const seedBase64 = prng.seed.toBase64({
    alphabet: 'base64url',
    omitPadding: true,
  });
  // The router keeps its search params inside the hash,
  // so setting them on window.location's own query
  // gives a link the draw never reads the seed from.
  const replayHref = router.history.createHref(
    router.buildLocation({
      to: '.',
      search: prev => ({
        ...prev,
        seed: seedBase64,
      }),
    }).href,
  );

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      'replay:',
      new URL(replayHref, window.location.href).toString(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prng.seed]);

  return prng.generator;
};
