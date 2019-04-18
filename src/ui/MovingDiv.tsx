import {
  useCallback,
  useEffect,
  memo,
} from 'react'

import {
  noop,
} from 'lodash'

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
  const onAnimationEndCb = useCallback(() => {
    const cb = onAnimationEnd || noop
    cb(data)
  }, [data, onAnimationEnd])

  const animateCell = useCallback(() => {
    const fromCell = document.querySelector(from)
    const toCell = document.querySelector(to)
    if (fromCell instanceof HTMLElement && toCell instanceof HTMLElement) {
      animateContentTransfer(fromCell, toCell, duration).then(onAnimationEndCb)
    }
  }, [from, to, duration, data, onAnimationEnd])

  useEffect(() => {
    animateCell()
  }, [])

  return null
}

export default memo(MovingDiv)
