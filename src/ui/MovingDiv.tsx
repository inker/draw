import {
  useCallback,
  useRef,
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
  const animationRef = useRef<boolean>(false)
  const onAnimationEndCb = useCallback(() => {
    const cb = onAnimationEnd || noop
    cb(data)
  }, [data, onAnimationEnd])

  if (!animationRef.current) {
    animationRef.current = true
    const fromCell = document.querySelector(from)
    const toCell = document.querySelector(to)
    if (fromCell instanceof HTMLElement && toCell instanceof HTMLElement) {
      animateContentTransfer(fromCell, toCell, duration).then(onAnimationEndCb)
    }
  }

  return null
}

export default memo(MovingDiv)
