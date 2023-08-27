import {
  useEffect,
  useState,
} from 'react'

type ResetKey = string | number | bigint | boolean | null | undefined;

export default (delayMs: number, resetKey?: ResetKey) => {
  const [isTimedOut, setIsTimedOut] = useState(false)

  useEffect(() => {
    setIsTimedOut(false)
    const handle = setTimeout(() => {
      setIsTimedOut(true)
    }, delayMs)

    return () => {
      clearTimeout(handle)
    }
  }, [resetKey])

  return isTimedOut
}
