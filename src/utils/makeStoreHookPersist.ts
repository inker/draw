import { useCallback } from 'react'
import { stubTrue } from 'lodash'

import makeStoreHook from 'utils/makeStoreHook'

interface Options<ParsedType> {
  parse: (storedValue: string) => ParsedType,
  serialize: (value: any) => string,
  validate?: (parsedValue: ParsedType) => boolean,
}

type RequiredOptions<ParsedType> = Required<Options<ParsedType>>

const defaultOptions: RequiredOptions<unknown> = {
  parse: (storedValue: string) => JSON.parse(storedValue),
  serialize: (value: any) => JSON.stringify(value),
  validate: stubTrue,
}

export default <S>(key: string, initialState: S, options?: Options<S>) => {
  const o = {
    ...(defaultOptions as RequiredOptions<S>),
    ...options,
  }

  const use = makeStoreHook(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        const parsed = o.parse(item)
        if (o.validate(parsed)) {
          return parsed as S
        }
      }
    } catch (err) {
      console.error(err)
    }

    try {
      window.localStorage.setItem(key, o.serialize(initialState))
    } catch (err) {
      console.error(err)
    }
    return initialState
  })

  return () => {
    const [storedValue, setStoredValue] = use()
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = useCallback((value: React.SetStateAction<S>) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function
          ? value(storedValue)
          : value
        // Save state
        setStoredValue(valueToStore)
        // Save to local storage
        window.localStorage.setItem(key, o.serialize(valueToStore))
      } catch (err) {
        // A more advanced implementation would handle the error case
        console.error(err)
      }
    }, [setStoredValue])

    const reset = useCallback(() => {
      setStoredValue(initialState)
      try {
        window.localStorage.removeItem(key)
      } catch (err) {
        console.error(err)
      }
    }, [setStoredValue])

    return [storedValue, setValue, reset] as const
  }
}
