import hmacSha256 from './hmacSha256';

export default async (seed: BufferSource) => {
  const calcHmacSha256 = await hmacSha256(seed);
  return async function* () {
    const dv = new DataView(new ArrayBuffer(8));
    for (let i = 0n; ; ++i) {
      // Written big-endian rather than through BigUint64Array,
      // whose byte order follows the host,
      // so the same seed replays the same stream everywhere.
      dv.setBigUint64(0, i, false);
      // eslint-disable-next-line no-await-in-loop
      yield await calcHmacSha256(dv);
    }
  };
};
