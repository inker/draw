import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const BackgroundAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {}
`

const Abs = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

interface BackgroundProps {
  animate: boolean,
}

const Background = styled<BackgroundProps>(Abs)`
  background-color: white;
  opacity: 0.75;
  ${props => props.animate && `
    animation: ${BackgroundAnimation} 0.1s ease-out;
  `}
`

const Text = styled(Abs)`
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

const Overlay: React.SFC<Props> = ({
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

export default Overlay
