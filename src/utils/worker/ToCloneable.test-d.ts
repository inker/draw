import type ToCloneable from './ToCloneable';

// A plain mutual extends check lets any through,
// whereas comparing these generic functions only passes for identical types.
type Equals<A, B> =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

type Assert<T extends true> = T;

export type Cases = [
  Assert<Equals<ToCloneable<number>, number>>,
  Assert<Equals<ToCloneable<Iterable<number>>, readonly number[]>>,
  Assert<
    Equals<
      ToCloneable<Iterable<readonly [number, number]>>,
      readonly (readonly [number, number])[]
    >
  >,
  Assert<Equals<ToCloneable<readonly number[]>, readonly number[]>>,
  Assert<Equals<ToCloneable<Set<number>>, Set<number>>>,
  Assert<Equals<ToCloneable<ReadonlySet<number>>, ReadonlySet<number>>>,
  Assert<Equals<ToCloneable<Map<string, number>>, Map<string, number>>>,
  Assert<
    Equals<
      ToCloneable<ReadonlySet<number> | readonly number[]>,
      ReadonlySet<number> | readonly number[]
    >
  >,
  Assert<Equals<ToCloneable<Uint8Array>, Uint8Array>>,
  Assert<Equals<ToCloneable<Date>, Date>>,
  Assert<Equals<ToCloneable<() => void>, never>>,
  Assert<
    Equals<
      ToCloneable<{
        ids: Iterable<number>;
        onProgress?: () => void;
      }>,
      {
        ids: readonly number[];
        onProgress?: undefined;
      }
    >
  >,
];
