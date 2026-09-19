import hmacSha256, { type Sha256Digest } from './hmacSha256';
import rangeGenerator from './rangeGenerator';

/**
 * How many digests are signed at once.
 * Measured over 7,200 digests, four at a time halves the serial cost
 * & sixteen takes another third off,
 * after which the per-call cost of crypto.subtle.sign is amortised away
 * & a larger batch only widens the tail of digests computed for nobody
 */
const BATCH_SIZE = 16;

/**
 * The stream every draw is dealt from,
 * carrying the digest width
 * so a consumer that needs a fixed number of bytes per pull can demand it
 */
export type PrngGenerator = AsyncGenerator<Sha256Digest, never, unknown>;

/**
 * Counts up big-endian across `byteLength` bytes,
 * wrapping to zero once every one of them has,
 * rather than in the host's byte order like a multi-byte typed array,
 * so the same seed replays the same stream everywhere
 */
function* counterSequence<ByteLength extends number>(
  byteLength: ByteLength,
): Generator<
  Uint8Array<ArrayBuffer> & {
    byteLength: ByteLength;
  },
  never,
  unknown
> {
  const counter = new Uint8Array(byteLength);
  for (;;) {
    // Copied rather than handed out as is,
    // so a caller that holds on to a value
    // doesn't find it changing underneath.
    yield counter.slice() as typeof counter & {
      byteLength: ByteLength;
    };
    // a byte wrapping to zero is the carry into the byte before it
    for (let i = byteLength - 1; i >= 0; --i) {
      ++counter[i];
      if (counter[i] !== 0) {
        break;
      }
    }
  }
}

/**
 * An endless stream of HMAC-SHA256 digests over a counter,
 * which is NIST SP 800-108 counter mode by another name.
 * Spelled out rather than inferred,
 * because TypeScript only infers a never-returning type
 * for function expressions rather than declarations,
 * & every caller reads `value` without checking for the end
 */
export default async function* ({
  byteLength,
  seed,
}: {
  byteLength: number;
  seed: Parameters<typeof hmacSha256>[0];
}): PrngGenerator {
  const calcHmacSha256 = await hmacSha256(seed);
  const counters = counterSequence(byteLength);
  for (;;) {
    // Counter mode makes a digest independent of the one before it,
    // so the batch can be signed at once
    // rather than a round trip at a time.
    // eslint-disable-next-line no-await-in-loop
    const batch = await Promise.all(
      rangeGenerator(BATCH_SIZE).map(() =>
        calcHmacSha256(counters.next().value),
      ),
    );
    yield* batch;
  }
}
