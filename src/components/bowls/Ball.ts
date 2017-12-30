import styled from 'styled-components'

const Ball = styled.div`
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */

  width: 50px;
  height: 50px;

  margin: 2px;
  padding: 10px;

  font-size: ${props => props.selected ? 0.8 : 0}em;
  font-family: 'Arial Narrow', 'Ubuntu Condensed', sans-serif;
  font-weight: ${props => props.selected ? 'bold' : ''};
  text-align: center;
  text-overflow: ellipsis;
  color: ${props => props.selected ? 'white' : ''};

  background: ${props => props.selected ? '' : 'radial-gradient(#004, #002, #002)'};
  border-radius: 100%;
  cursor: ${props => props.noHover ? 'not-allowed' : 'pointer'};
  user-select: none;

  &:hover {
    ${({ noHover }) => !noHover && 'background: radial-gradient(#ccf, #ccf)'};
  }
  @media (max-width: 999px) {
    flex-flow: row wrap;
    & > * {
      flex: 1;
      flex-basis: 22%;
    }

    width: 20px;
    height: 20px;

    font-size: ${props => props.selected ? 10 : 0}px;
  }
`

export default Ball
