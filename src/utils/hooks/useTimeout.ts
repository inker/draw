import { useState } from 'react'

import useOnce from './useOnce'

export default (delay: number) => {
  const [isTimedOut, setIsTimedOut] = useState(false)

  useOnce(() => {
    setTimeout(() => {
      setIsTimedOut(true)
    }, delay)
  })

  return isTimedOut
}
