import {
  useEffect,
  useRef,
} from 'react'

type UseEffectParameters = Parameters<typeof useEffect>

export default (effect: UseEffectParameters[0], deps?: UseEffectParameters[1]) => {
  const isInitialMount = useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
  }, deps)
}
