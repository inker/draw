import React, { memo } from 'react'
import styled from 'styled-components'

import Modal from './Modal'

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
  <Modal noAnimation={noAnimation}>
    <Text>
      {children}
    </Text>
  </Modal>
)

export default memo(Notification)
