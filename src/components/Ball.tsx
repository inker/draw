import * as React from 'react'
import styled from 'styled-components'

const Ball = styled.div`
  float: left;
  width: 60px;
  height: 60px;
  /*vertical-align: middle;*/
  text-align: center;
  border-radius: 100%;
  padding: 10px;
  font-size: ${props => props.picked ? 0.8 : 0}em;
  text-overflow: ellipsis;
  font-family: 'Arial Narrow', 'Ubuntu Condensed', sans-serif;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  background: ${props => props.picked ? '' : 'radial-gradient(#004, #002, #002)'};
  color: ${props => props.picked ? 'white' : ''};
  font-weight: ${props => props.picked ? 'bold' : ''};
  cursor: ${props => props.noHover ? 'not-allowed' : 'pointer'};
  user-select: none;
  margin: 2px;

  &:hover {
    ${({ noHover }) => !noHover && 'background: radial-gradient(#ccf, #ccf)'};
  }
`

export default Ball
