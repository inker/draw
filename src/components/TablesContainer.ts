import styled from 'styled-components'

const TablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 65%;
  margin: 0px 5px 10px 5px;

  @media (max-width: 999px) {
    width: 100%;
    margin: 0px 10px 20px 10px;
  }
`

export default TablesContainer
