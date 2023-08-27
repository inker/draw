import {
  type ReactNode,
  memo,
} from 'react'

import Background from './Background'
import Body from './Body'

interface Props {
  children: ReactNode,
  noAnimation: boolean,
}

function Modal({
  noAnimation,
  children,
}: Props) {
  return (
    <div>
      <Background $animate={!noAnimation} />
      <Body>
        {children}
      </Body>
    </div>
  )
}

export default memo(Modal)
