import { useRef } from 'react'

export default (callback: () => void) => {
  const ref = useRef<boolean>(false)
  if (!ref.current) {
    ref.current = true
    callback()
  }
}
