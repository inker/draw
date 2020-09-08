import {
  useState,
  useEffect,
  useMemo,
} from 'react'

import { isSafari } from 'utils/browser'

export default (media: string) => {
  const matchResult = useMemo(() => window.matchMedia(media), [media])

  if (isSafari) {
    matchResult.addEventListener = (e, listener) =>
      matchResult.addListener(listener)

    matchResult.removeEventListener = (e, listener) =>
      matchResult.removeListener(listener)
  }

  const [isMatch, setIsMatch] = useState(matchResult.matches)

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches)
    }

    matchResult.addEventListener('change', listener)

    return () => {
      matchResult.removeEventListener('change', listener)
    }
  }, [matchResult])

  return isMatch
}
