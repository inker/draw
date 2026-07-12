import { findFirstSolutionMutable } from '#utils/backtrack';

type ReadonlyDoubleArray<T> = readonly (readonly T[])[];

export type PredicateFn<T> = (
  picked: T,
  groups: ReadonlyDoubleArray<T>,
  groupIndex: number,
) => boolean;

/**
 * A predicate that keeps incremental constraint state.
 * The search drives the lifecycle: `reset` from the committed groups at the
 * start of each check, then `place`/`unplace` in lockstep with every
 * descent/backtrack, so `check` can read O(1) counters instead of rescanning.
 */
export interface StatefulPredicate<T> {
  check: PredicateFn<T>;
  reset: (groups: ReadonlyDoubleArray<T>) => void;
  place: (team: T, groupIndex: number) => void;
  unplace: (team: T, groupIndex: number) => void;
}

export type Predicate<T> = PredicateFn<T> | StatefulPredicate<T>;

// eslint-disable-next-line max-params
function anyGroupPossible<T>(
  source: readonly T[],
  initialGroups: ReadonlyDoubleArray<T>,
  picked: T,
  groupIndex: number,
  predicate: Predicate<T>,
): boolean {
  const hooks = typeof predicate === 'function' ? null : predicate;
  const check = typeof predicate === 'function' ? predicate : predicate.check;

  // mutable working copy: the search fills it in place & backtracks with pop,
  // so no per-node array is allocated
  const groups = initialGroups.map(group => [...group]);
  const numGroups = groups.length;

  hooks?.reset(groups);

  // picked is pinned to the group under test
  if (!check(picked, groups, groupIndex)) {
    return false;
  }
  groups[groupIndex].push(picked);
  hooks?.place(picked, groupIndex);

  // teams left to place, one per descent level
  let depth = 0;

  return findFirstSolutionMutable<number>({
    isSolved: () => depth === source.length,
    getCandidates: () => {
      const team = source[depth];
      const candidates: number[] = [];
      for (let i = 0; i < numGroups; ++i) {
        if (check(team, groups, i)) {
          candidates.push(i);
        }
      }
      return candidates;
    },
    apply: i => {
      const team = source[depth];
      groups[i].push(team);
      hooks?.place(team, i);
      ++depth;
    },
    undo: i => {
      --depth;
      const team = source[depth];
      hooks?.unplace(team, i);
      groups[i].pop();
    },
  });
}

interface Input<T> {
  pots: ReadonlyDoubleArray<T>;
  groups: ReadonlyDoubleArray<T>;
  picked: T;
  predicate: Predicate<T>;
}

export const allPossibleGroups = <T>({
  pots,
  groups,
  picked,
  predicate,
}: Input<T>) => {
  const source = pots.flat();
  return groups
    .map((_, i) => i)
    .filter(i => anyGroupPossible(source, groups, picked, i, predicate));
};

export const firstPossibleGroup = <T>({
  pots,
  groups,
  picked,
  predicate,
}: Input<T>) => {
  const source = pots.flat();
  return groups.findIndex((_, i) =>
    anyGroupPossible(source, groups, picked, i, predicate),
  );
};
