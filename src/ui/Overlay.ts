import styled from 'styled-components'

const Z_INDEX = 100000000

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX};
  width: 100%;
  height: 100%;
`

export default Overlay
