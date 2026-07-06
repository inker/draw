import {
  type BacktrackOptions,
  type MutableBacktrackOptions,
  findFirstSolution,
  findFirstSolutionMutable,
} from '../src/utils/backtrack';

describe('findFirstSolution', () => {
  it('should return undefined when reject condition is met', () => {
    const options: BacktrackOptions<number> = {
      reject: candidate => candidate > 5,
      accept: candidate => candidate === 5,
      generate: candidate => [candidate + 1, candidate + 2],
    };
    const result = findFirstSolution(6, options);
    expect(result).toBeUndefined();
  });

  it('should return undefined when no solution is found', () => {
    const options: BacktrackOptions<number> = {
      reject: candidate => candidate > 5,
      accept: candidate => candidate === 10,
      generate: candidate => [candidate + 1, candidate + 2],
    };
    const result = findFirstSolution(1, options);
    expect(result).toBeUndefined();
  });

  it('should return the first accepted solution', () => {
    const options: BacktrackOptions<number> = {
      reject: candidate => candidate > 5,
      accept: candidate => candidate === 4,
      generate: candidate => [candidate + 1, candidate + 2],
    };
    const result = findFirstSolution(1, options);
    expect(result).toBe(4);
  });

  it('should handle multiple generations', () => {
    const options: BacktrackOptions<number> = {
      reject: candidate => candidate > 10,
      accept: candidate => candidate === 10,
      generate: candidate => [candidate + 1, candidate + 2],
    };
    const result = findFirstSolution(1, options);
    expect(result).toBe(10);
  });
});

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
