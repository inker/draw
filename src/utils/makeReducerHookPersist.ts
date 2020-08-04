import { useCallback } from 'react'

import makeReducerHook from 'utils/makeReducerHook'

type StateSet<T> = (state: T) => T

export default <T>(key: string, initialValue: T) => {
  const use = makeReducerHook(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        return JSON.parse(item) as T
      }
    } catch (err) {
      console.error(err)
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(initialValue))
    } catch (err) {
      console.error(err)
    }
    return initialValue
  })

  return () => {
    const [storedValue, setStoredValue] = use()
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = useCallback((value: T | StateSet<T>) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function
          ? value(storedValue)
          : value
        // Save state
        setStoredValue(valueToStore)
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (err) {
        // A more advanced implementation would handle the error case
        console.error(err)
      }
    }, [setStoredValue])

    const reset = useCallback(() => {
      setStoredValue(initialValue)
      try {
        window.localStorage.removeItem(key)
      } catch (err) {
        console.error(err)
      }
    }, [setStoredValue])

    return [storedValue, setValue, reset] as const
  }
}
