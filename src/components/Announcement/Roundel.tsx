import * as React from 'react'
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
  color: ${props => props.color};
  ${props => !props.possible && `
    filter: grayscale(1) opacity(0.25);
  `}

  @media (max-width: 999px) {
    width: 45px;
    height: 45px;
    border-width: 2px;
    font-size: 30px;
  }
`

export default Roundel
