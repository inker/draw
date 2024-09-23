import { type atomWithStorage } from 'jotai/utils';
import { noop } from 'lodash';

type Storage<T> = NonNullable<Parameters<typeof atomWithStorage<T>>[2]>;

interface Options {
  validate: (value: string | null) => boolean;
}

export default <T>({ validate }: Options) =>
  ({
    getItem: (key, initialValue) => {
      const val = localStorage.getItem(key);
      return validate(val) ? (val as T) : initialValue;
    },
    setItem: (key, value) => {
      localStorage.setItem(key, value as string);
    },
    removeItem: key => {
      localStorage.removeItem(key);
    },
    subscribe: (key, callback, initialValue) => {
      window.addEventListener('storage', e => {
        if (e.storageArea === localStorage && e.key === key) {
          const { newValue } = e;
          if (validate(newValue)) {
            callback(newValue as T);
            return;
          }
          if (newValue !== null) {
            localStorage.removeItem(key);
          }
          callback(initialValue);
        }
      });
      return noop;
    },
  }) satisfies Storage<T>;
