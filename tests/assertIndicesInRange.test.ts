import assertIndicesInRange from '#utils/assertIndicesInRange';

describe('assertIndicesInRange', () => {
  it('accepts every index from 0 to length - 1', () => {
    expect(() => {
      assertIndicesInRange([0, 1, 2], 3, 'games');
    }).not.toThrow();
  });

  it('accepts no indices at all', () => {
    expect(() => {
      assertIndicesInRange([], 0, 'games');
    }).not.toThrow();
  });

  it.each([3, -1, 0.5, Number.NaN, undefined as unknown as number])(
    'rejects %s for 3 teams',
    index => {
      expect(() => {
        assertIndicesInRange([0, index], 3, 'games');
      }).toThrow(`games contains ${index}, which is not an index into 3 teams`);
    },
  );
});
