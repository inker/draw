import {
  EffectCallback,
  DependencyList,
  useEffect,
  useRef,
} from 'react'

export default (effect: EffectCallback, deps?: DependencyList) => {
  const isInitialMount = useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
  }, deps)
}
