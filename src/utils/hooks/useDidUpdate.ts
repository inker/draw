import {
  useEffect,
  useRef,
} from 'react'

type UseEffectParameters = Parameters<typeof useEffect>

export default (effect: () => void, deps?: UseEffectParameters[1]) => {
  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      effect()
    } else {
      didMountRef.current = true
    }
  }, deps)
}
