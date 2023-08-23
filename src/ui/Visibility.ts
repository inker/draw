import styled from 'styled-components'

interface Props {
  $visible: boolean,
}

const Visibility = styled.div<Props>`
  visibility: ${props => props.$visible ? '' : 'hidden'};
`

export default Visibility
