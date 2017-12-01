import React from 'react'
import styled, { keyframes } from 'styled-components'

import Overlay from './Overlay'

const BackgroundAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {}
`

interface BackgroundProps {
  animate: boolean,
}

const Background = styled<BackgroundProps>(Overlay)`
  background-color: white;
  opacity: 0.75;
  ${props => props.animate && `
    animation: ${BackgroundAnimation} 0.1s ease-out;
  `}
`

const Text = styled(Overlay)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vw;
  color: #808080;
  user-select: none;
`

interface Props {
  noAnimation: boolean,
}

const Popup: React.SFC<Props> = ({
  noAnimation,
  children,
}) => (
  <div>
    <Background animate={!noAnimation}/>
    <Text>
      {children}
    </Text>
  </div>
)

export default Popup
