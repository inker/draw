/**
 * Throws unless every value is an integer index into an array of `length`,
 * so a team list & the indices meant for it cannot silently drift apart
 */
export default (indices: Iterable<number>, length: number, label: string) => {
  for (const index of indices) {
    if (!Number.isInteger(index) || index < 0 || index >= length) {
      throw new Error(
        `${label} contains ${index}, which is not an index into ${length} teams`,
      );
    }
  }
};
