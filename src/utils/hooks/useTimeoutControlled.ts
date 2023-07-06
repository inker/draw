import {
  useState,
  useEffect,
} from 'react'

type ResetKey = string | number | bigint | boolean | null | undefined;

export default (delay: number, resetKey?: ResetKey) => {
  const [isTimedOut, setIsTimedOut] = useState(false)

  useEffect(() => {
    setIsTimedOut(false)
    const handle = setTimeout(() => {
      setIsTimedOut(true)
    }, delay)
    return () => {
      clearTimeout(handle)
    }
  }, [resetKey])

  return isTimedOut
}
