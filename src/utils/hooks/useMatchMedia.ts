import { useMemo, useState } from 'react'

import useOnce from './useOnce'

export default (media: string) => {
  const matchResult = useMemo(() => window.matchMedia(media), [media])
  const [isMatch, setIsMatch] = useState(matchResult.matches)

  useOnce(() => {
    matchResult.addEventListener('change', e => {
      setIsMatch(e.matches)
    })
  })

  return isMatch
}
