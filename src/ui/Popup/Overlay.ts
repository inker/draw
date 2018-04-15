import styled from 'styled-components'

const Z_INDEX = 100000000

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX};
`

export default Overlay
