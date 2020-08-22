import {
  useState,
  useCallback,
  useRef,
} from 'react'

export default <S>(initialState: S | (() => S)) => {
  const [state, setState] = useState(initialState)
  const stateStack = useRef<S[]>([])

  const undo = useCallback(() => {
    const arr = stateStack.current
    if (arr.length === 0) {
      return
    }
    const lastState = arr.pop()!
    setState(lastState)
  }, [])

  const set = useCallback((s: S) => {
    stateStack.current.push(s)
    setState(s)
  }, [setState])

  return [state, set, undo] as const
}
