type Primitive = string | number | boolean | bigint | null | undefined;

// Built-ins that structured clone copies as they are.
// Typed arrays are iterable,
// so without this they would turn into plain arrays below.
type ClonedAsIs = Date | RegExp | ArrayBuffer | ArrayBufferView | Error;

/**
 * What a value of type T has to be to cross into a web worker intact,
 * so a function can take an Iterable & its worker callers still pass an array.
 * Functions can't be cloned, so they become never.
 */
type ToCloneable<T> = T extends Primitive | ClonedAsIs
  ? T
  : T extends (...args: never) => unknown
    ? never
    : T extends readonly unknown[]
      ? {
          readonly [K in keyof T]: ToCloneable<T[K]>;
        }
      : // Sets & maps are iterable too,
        // so they have to be matched before Iterable to stay sets & maps.
        T extends Map<infer K, infer V>
        ? Map<ToCloneable<K>, ToCloneable<V>>
        : T extends ReadonlyMap<infer K, infer V>
          ? ReadonlyMap<ToCloneable<K>, ToCloneable<V>>
          : T extends Set<infer V>
            ? Set<ToCloneable<V>>
            : T extends ReadonlySet<infer V>
              ? ReadonlySet<ToCloneable<V>>
              : T extends Iterable<infer V>
                ? readonly ToCloneable<V>[]
                : {
                    [K in keyof T]: ToCloneable<T[K]>;
                  };

export default ToCloneable;
