import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const BackgroundAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.75;
  }
`

const Abs = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100%;
`

const Background = styled(Abs)`
  background-color: white;
  opacity: 0.75;
  animation: ${BackgroundAnimation} 0.25s ease-out;
`

const Root = styled(Abs)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vw;
  color: #808080;
`

const Wait = () => (
  <div>
    <Background />
    <Root>
      wait...
    </Root>
  </div>
)

export default Wait
