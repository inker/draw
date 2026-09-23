const BITS_PER_BYTE = 8;

/**
 * The buffers taken a bit at a time, most significant first.
 * Bytes rather than a wider typed array,
 * which would read in the host's byte order
 * & deal a different draw from the same seed on a big-endian machine
 */
export default async function* (
  buffers: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>,
) {
  for await (const buffer of buffers) {
    for (const byte of new Uint8Array(buffer)) {
      for (let shift = BITS_PER_BYTE - 1; shift >= 0; --shift) {
        yield ((byte >> shift) & 1) as 0 | 1;
      }
    }
  }
}
