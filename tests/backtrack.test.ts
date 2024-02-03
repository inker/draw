import {
  findFirstSolution,
  type BacktrackOptions,
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
