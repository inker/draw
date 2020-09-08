import {
  useState,
  useEffect,
  useMemo,
} from 'react'

export default (media: string) => {
  const matchResult = useMemo(() => window.matchMedia(media), [media])
  const [isMatch, setIsMatch] = useState(matchResult.matches)

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches)
    }

    // TODO: restore `addEventListener`
    matchResult.onchange = listener

    return () => {
      // TODO: restore `removeEventListener`
      matchResult.onchange = null
    }
  }, [matchResult])

  return isMatch
}
