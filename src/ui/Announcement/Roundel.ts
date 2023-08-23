import styled, { css } from 'styled-components'

interface Props {
  $possible: boolean,
}

const Roundel = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  width: 25px;
  height: 25px;
  border-width: 1px;
  border-style: solid;
  border-radius: 100%;
  font-size: 18px;
  ${props => props.$possible
    ? css`
      color: ${props.color};
    `
    : css`
      border-color: rgb(0 0 0 / 0);
      filter: opacity(0.25);
    `}
`

export default Roundel
