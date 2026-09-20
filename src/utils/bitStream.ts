const BITS_PER_BYTE = 8;

/**
 * What a consumer reads a bit at a time
 */
export type BitStream = AsyncGenerator<0 | 1, never, unknown>;

/**
 * An endless stream of buffers taken a bit at a time, most significant first.
 * Bytes rather than a wider typed array,
 * which would read in the host's byte order
 * & deal a different draw from the same seed on a big-endian machine.
 * Spelled out rather than inferred,
 * because TypeScript only infers a never-returning type
 * for function declarations rather than expressions
 */
export default async function* (
  buffers: AsyncGenerator<ArrayBuffer, never, unknown>,
): BitStream {
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const { value } = await buffers.next();
    for (const byte of new Uint8Array(value)) {
      for (let shift = BITS_PER_BYTE - 1; shift >= 0; --shift) {
        yield ((byte >> shift) & 1) as 0 | 1;
      }
    }
  }
}
