import {
  memo,
  RefObject,
} from 'react'

import useOnce from 'utils/hooks/useOnce'
import animateContentTransfer from 'utils/animateContentTransfer'

type El = RefObject<HTMLElement | null> | string

const getElement = (i: El) =>
  typeof i === 'string'
    ? document.querySelector(i)
    : i.current

interface Props {
  from: El,
  to: El,
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
  useOnce(() => {
    const fromCell = getElement(from)
    const toCell = getElement(to)
    if (fromCell instanceof HTMLElement && toCell instanceof HTMLElement) {
      animateContentTransfer(fromCell, toCell, duration).then(() => {
        if (onAnimationEnd) {
          onAnimationEnd(data)
        }
      })
    }
  })

  return null
}

export default memo(MovingDiv)
