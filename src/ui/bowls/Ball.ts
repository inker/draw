import styled from 'styled-components'

const Ball = styled.div`
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */

  width: 67px;
  height: 67px;

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

    width: 21px;
    height: 21px;

    font-size: ${props => props.selected ? 8 : 0}px;
  }
`

export default Ball
