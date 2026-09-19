/**
 * One float in [0, 1) drawn from the stream,
 * off the top 53 bits so every value a double can represent is reachable
 */
export default async (
  prngGenerator: AsyncGenerator<ArrayBufferLike, never, unknown>,
) => {
  const { value } = await prngGenerator.next();
  return Number(new DataView(value).getBigUint64(0, false) >> 11n) / 2 ** 53;
};
