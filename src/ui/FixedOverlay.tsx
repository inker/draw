import { type ReactNode, memo } from 'react'

import makeStyleClass from 'utils/makeStyleClass'
import Portal from 'ui/Portal'

const airborneDivClass = makeStyleClass`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`

const airborneDiv = document.createElement('div')
airborneDiv.classList.add(airborneDivClass)
document.body.insertBefore(airborneDiv, document.getElementById('app'))

interface Props {
  children: ReactNode
}

function FixedOverlay({ children }: Props) {
  return (
    <Portal
      tagName="div"
      modalRoot={airborneDiv}
    >
      {children}
    </Portal>
  )
}

export default memo(FixedOverlay)
