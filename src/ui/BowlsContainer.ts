import styled from 'styled-components'

const BowlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  min-width: 35%;
  text-align: center;

  @media (max-width: 999px) {
    align-items: center;
  }
`

export default BowlsContainer
