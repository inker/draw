import {
  type ReactNode,
  memo,
} from 'react'

import styled from 'styled-components'

import Modal from './Modal'

const Text = styled.div`
  font-size: 5vw;
  color: ${props => props.theme.isDarkMode ? '' : '#808080'};
  user-select: none;

  @media (max-width: 999px) {
    font-size: 8vw;
  }
`

interface Props {
  children: ReactNode,
  noAnimation: boolean,
}

function Notification({
  noAnimation,
  children,
}: Props) {
  return (
    <Modal noAnimation={noAnimation}>
      <Text>
        {children}
      </Text>
    </Modal>
  )
}

export default memo(Notification)
