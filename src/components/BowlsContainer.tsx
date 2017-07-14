import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 35%;
  margin: 0px 5px 10px 5px;

  @media (max-width: 999px) {
    width: 100%;
    align-items: center;
    margin: 0px 10px 20px 10px;
  }
`
