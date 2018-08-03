import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

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
  ${props => props.animate && `
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
