import styled from 'styled-components'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  visible: boolean,
}

const Visibility = styled.div<Props>`
  visibility: ${props => props.visible ? '' : 'hidden'};
`

export default Visibility
