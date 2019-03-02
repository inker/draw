import React, { memo } from 'react'
import styled from 'styled-components'

import Popup from './Popup'

const Text = styled.div`
  font-size: 5vw;
  color: #808080;
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`

interface Props {
  noAnimation: boolean,
}

const Notification: React.FC<Props> = ({
  noAnimation,
  children,
}) => (
  // @ts-ignore
  <Popup noAnimation={noAnimation}>
    <Text>
      {children}
    </Text>
  </Popup>
)

export default memo(Notification)
