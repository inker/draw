import {
  type MutableBacktrackOptions,
  findFirstSolutionMutable,
} from '../src/utils/backtrack';

describe('findFirstSolutionMutable', () => {
  // build a permutation of 0..size-1 one element at a time
  const makePermutationOptions = (
    size: number,
    state: number[],
  ): MutableBacktrackOptions<number> => ({
    isSolved: () => state.length === size,
    getCandidates: () =>
      Array.from(
        {
          length: size,
        },
        (_, i) => i,
      ).filter(value => !state.includes(value)),
    apply: choice => {
      state.push(choice);
    },
    undo: () => {
      state.pop();
    },
  });

  it('should solve & leave the state mutated to the solution', () => {
    const state: number[] = [];
    const result = findFirstSolutionMutable(makePermutationOptions(4, state));
    expect(result).toBe(true);
    expect([...state].sort((a, b) => a - b)).toEqual([0, 1, 2, 3]);
  });

  it('should return false & restore the state when there is no solution', () => {
    const state: number[] = [];
    const options: MutableBacktrackOptions<number> = {
      isSolved: () => state.length === 2 && state[0] + state[1] === 10,
      getCandidates: () => (state.length >= 2 ? [] : [1, 2, 3]),
      apply: choice => {
        state.push(choice);
      },
      undo: () => {
        state.pop();
      },
    };
    const result = findFirstSolutionMutable(options);
    expect(result).toBe(false);
    expect(state).toEqual([]);
  });

  it('should recover from budget exhaustion via restarts', () => {
    const state: number[] = [];
    const result = findFirstSolutionMutable(
      makePermutationOptions(5, state),
      1,
    );
    expect(result).toBe(true);
    expect([...state].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4]);
  });
});
