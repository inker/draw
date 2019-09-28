import React, { memo } from 'react'

import Background from './Background'
import Body from './Body'

interface Props {
  noAnimation: boolean,
}

const Modal: React.FC<Props> = ({
  noAnimation,
  children,
}) => (
  <div>
    <Background animate={!noAnimation} />
    <Body>
      {children}
    </Body>
  </div>
)

export default memo(Modal) as typeof Modal
