import {
  useEffect,
  useRef,
} from 'react'

export default (effect: () => void, deps?: any[]) => {
  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      effect()
    } else {
      didMountRef.current = true
    }
  }, deps)
}
