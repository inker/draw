import styled, { css } from 'styled-components'

interface Props {
  possible: boolean,
}

const Roundel = styled.div<Props>`
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

  ${props => props.possible ? css`
    color: ${props.color};
  ` : css`
    border-color: rgba(0, 0, 0, 0);
    filter: opacity(0.25);
  `}
`

export default Roundel
