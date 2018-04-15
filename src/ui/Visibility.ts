import styled from 'styled-components'

const Visibility = styled.div`
  visibility: ${props => props.visible ? '' : 'hidden'};
`

export default Visibility
