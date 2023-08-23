import styled, { css } from 'styled-components'

interface Props {
  $limitWidth: boolean,
}

const Root = styled.div<Props>`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: center;

  > * {
    flex: 1;
    flex-basis: 22%;
    ${props => props.$limitWidth && css`
      max-width: 160px;
    `}

    @media (max-width: 999px) {
      max-width: initial;
    }
  }
`

export default Root
