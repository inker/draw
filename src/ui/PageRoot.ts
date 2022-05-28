import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  margin: auto;
  width: 1000px;

  @media (max-width: 999px) {
    flex-direction: column;
    width: 100%;
  }
`

export default Root
