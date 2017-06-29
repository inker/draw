import * as React from 'react'
import styled from 'styled-components'

const Ball = styled.div`
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */

  width: 60px;
  height: 60px;

  margin: 2px;
  padding: 10px;

  font-size: ${props => props.picked ? 0.8 : 0}em;
  font-family: 'Arial Narrow', 'Ubuntu Condensed', sans-serif;
  font-weight: ${props => props.picked ? 'bold' : ''};
  text-align: center;
  text-overflow: ellipsis;
  color: ${props => props.picked ? 'white' : ''};

  background: ${props => props.picked ? '' : 'radial-gradient(#004, #002, #002)'};
  border-radius: 100%;
  cursor: ${props => props.noHover ? 'not-allowed' : 'pointer'};
  user-select: none;

  &:hover {
    ${({ noHover }) => !noHover && 'background: radial-gradient(#ccf, #ccf)'};
  }

  @media (max-width: 999px) {
    width: 85px;
    height: 85px;
    font-size: ${props => props.picked ? 1.2 : 0}em;
  }

  @media (max-width: 850px) {
    flex-flow: row wrap;
    & > * {
      flex: 1;
      flex-basis: 22%;
    }
  }
`

export default Ball
