/**
 * Counts up big-endian across `byteLength` bytes,
 * wrapping to zero once every one of them has,
 * rather than in the host's byte order like a multi-byte typed array,
 * so the sequence is the same everywhere it runs
 */
export default function* counterSequence<ByteLength extends number>(
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
