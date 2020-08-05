import { useCallback } from 'react'

export default <S extends Record<string, any>>(setter: React.Dispatch<React.SetStateAction<S>>) =>
  useCallback((s: React.SetStateAction<Partial<S>>) =>
    setter(oldState => ({
      ...oldState,
      ...(s instanceof Function ? s(oldState) : s),
    })), [setter])
