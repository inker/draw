import {
  useCallback,
  useEffect,
  memo,
} from 'react'

import animateContentTransfer from 'utils/animateContentTransfer'

interface Props {
  from: string,
  to: string,
  duration: number,
  data?: any,
  onAnimationEnd?: (data: any) => void,
}

const MovingDiv = ({
  from,
  to,
  duration,
  data,
  onAnimationEnd,
}: Props) => {
  const animateCell = useCallback(() => {
    const fromCell = document.querySelector(from)
    const toCell = document.querySelector(to)
    if (fromCell instanceof HTMLElement && toCell instanceof HTMLElement) {
      const p = animateContentTransfer(fromCell, toCell, duration)
      if (onAnimationEnd) {
        p.then(() => onAnimationEnd(data))
      }
    }
  }, [from, to, duration, data, onAnimationEnd])

  useEffect(() => {
    animateCell()
  }, [])

  return null
}

export default memo(MovingDiv)
