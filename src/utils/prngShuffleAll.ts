import { type PrngGenerator } from './prng';
import prngShuffle from './prngShuffle';

/**
 * Shuffles each collection off the one stream, one at a time,
 * because the generator is a single cursor
 * & concurrent draws would slice it in whatever order the event loop resumed.
 * Arrays rather than iterables inside,
 * because inference through a nested `Iterable` gives `unknown`
 */
export default async <T>({
  collections,
  prngGenerator,
}: {
  collections: Iterable<readonly T[]>;
  prngGenerator: PrngGenerator;
}) => {
  const shuffled: T[][] = [];
  for (const collection of collections) {
    // eslint-disable-next-line no-await-in-loop
    const shuffledCollection = await prngShuffle({
      collection,
      prngGenerator,
    });
    shuffled.push(shuffledCollection);
  }
  return shuffled;
};
