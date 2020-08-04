import styled, { css } from 'styled-components'

import Ball from 'ui/Ball'

interface Props {
  noHover?: boolean,
  selected?: boolean,
  forceVisible?: boolean,
}

const BowlBall = styled(Ball)<Props>`
  ${props => props.selected ? css`
    font-size: 0.8em;
    font-weight: bold;
    color: white;
  ` : css`
    font-size: 0;
    background: radial-gradient(#004, #002, #002);
  `}

  ${props => props.forceVisible && css`
    font-size: 0.8em;
  `}

  @media (max-width: 999px) {
    font-size: ${props => props.selected ? 8 : 0}px;
  }
`

export default BowlBall
