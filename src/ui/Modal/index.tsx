import React, { memo } from 'react'
import styled, { css, keyframes } from 'styled-components'

import Overlay from './Overlay'

const BackgroundAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {}
`

const Background = styled(Overlay)`
  background-color: white;
  opacity: 0.75;
  ${props => props.animate && css`
    animation: ${BackgroundAnimation} 0.25s ease-out;
  `}
`

const Body = styled(Overlay)`
  display: flex;
  justify-content: center;
  align-items: center;
`

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

export default memo(Modal)
