import { generateValidPatterns } from '../src/engine/dfs/ls/generateSchedule/homeAwayPatterns';

// A pattern mask (bit md set = home) as an H/A string, matchday 0 first.
const toString = (mask: number, numMatchdays: number) =>
  Array.from({ length: numMatchdays }, (_, md) =>
    (mask >> md) & 1 ? 'H' : 'A',
  ).join('');

// Independent oracle: the original brute-force definition this replaced -
// enumerate every binary string, keep the balanced ones with no more than two
// of a location in a row & alternating first & last two matchdays.
const oracle = (numMatchdays: number) => {
  const result: string[] = [];
  for (let i = 0; i < 2 ** numMatchdays; ++i) {
    const chars = Array.from({ length: numMatchdays }, (_, md) =>
      (i >> md) & 1 ? 'H' : 'A',
    );
    const s = chars.join('');
    const numHome = chars.filter(c => c === 'H').length;
    const isValid =
      numHome === numMatchdays / 2 &&
      chars[0] !== chars[1] &&
      chars[numMatchdays - 2] !== chars[numMatchdays - 1] &&
      !s.includes('HHH') &&
      !s.includes('AAA');
    if (isValid) {
      result.push(s);
    }
  }
  return result.sort();
};

describe('generateValidPatterns', () => {
  for (const numMatchdays of [2, 4, 6, 8]) {
    it(`matches the brute-force definition for ${numMatchdays} matchdays`, () => {
      const generated = generateValidPatterns(numMatchdays)
        .map(mask => toString(mask, numMatchdays))
        .sort();

      expect(generated).toEqual(oracle(numMatchdays));
      expect(generated.length).toBeGreaterThan(0);
      // no duplicates
      expect(new Set(generated).size).toBe(generated.length);
    });
  }

  it('returns nothing when the matchday count is odd (cannot be balanced)', () => {
    expect(generateValidPatterns(3)).toEqual([]);
  });
});
