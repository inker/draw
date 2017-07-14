import * as React from 'react'
import styled from 'styled-components'

const Abs = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100%;
`

const Background = styled(Abs)`
  filter: blur(5px);
  background-color: white;
  opacity: 0.75;
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
