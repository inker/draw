import {
  useEffect,
  useMemo,
  useState,
} from 'react'

export default (media: string) => {
  const matchResult = useMemo(() => window.matchMedia(media), [media])

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
