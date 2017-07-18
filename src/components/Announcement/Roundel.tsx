import styled from 'styled-components'

const Roundel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25px;
  height: 25px;
  margin: 2px;

  border-width: 1px;
  border-style: solid;
  border-radius: 100%;

  font-size: 18px;

  ${props => props.possible ? `
    color: ${props.color};
  ` : `
    color: #000;
    border-color: rgba(0,0,0,0);
    filter: opacity(0.25);
  `}

  @media (max-width: 999px) {
    width: 45px;
    height: 45px;
    border-width: 2px;
    font-size: 30px;
  }
`

export default Roundel
