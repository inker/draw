import { type PrngGenerator } from './generator';

/**
 * One float in [0, 1) drawn from the stream,
 * off the top 53 bits so every value a double can represent is reachable.
 * Asks for a digest rather than any buffer,
 * which is narrower than the eight bytes actually read,
 * because a lower bound on a width is not something the type system can state
 * & the exact width is the nearest checkable thing to it
 */
export default async (prngGenerator: PrngGenerator) => {
  const { value } = await prngGenerator.next();
  return Number(new DataView(value).getBigUint64(0, false) >> 11n) / 2 ** 53;
};
