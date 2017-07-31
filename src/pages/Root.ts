import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  margin: auto;
  width: 1000px;
  @media (max-width: 999px) {
    width: 100%;
    flex-direction: column;
  }
`

export default Root
