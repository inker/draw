import React, { PureComponent } from 'react'
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
  z-index: 100000000;
  background-color: white;
  opacity: 0.75;
  ${props => props.animate && `
    animation: ${BackgroundAnimation} 0.25s ease-out;
  `}
`

const Body = styled(Overlay)`
  z-index: 100000000;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {
  noAnimation: boolean,
}

class Popup extends PureComponent<Props> {
  render() {
    const {
      noAnimation,
      children,
    } = this.props

    return (
      <div>
        <Background animate={!noAnimation} />
        <Body>
          {children}
        </Body>
      </div>
    )
  }
}

export default Popup
