import { memo } from 'react'

import useOnce from 'utils/hooks/useOnce'
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
  useOnce(() => {
    const fromCell = document.querySelector(from)
    const toCell = document.querySelector(to)
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
