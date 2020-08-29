import {
  useState,
  useEffect,
} from 'react'

export default (delay: number) => {
  const [isTimedOut, setIsTimedOut] = useState(false)

  useEffect(() => {
    const handle = setTimeout(() => {
      setIsTimedOut(true)
    }, delay)
    return () => {
      clearTimeout(handle)
    }
  }, [])

  return isTimedOut
}
