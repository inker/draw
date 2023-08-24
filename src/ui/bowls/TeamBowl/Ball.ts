import styled, { css } from 'styled-components'

import BowlBall from '../BowlBall'

interface Props {
  $notSelected?: boolean,
}

const TeamBall = styled(BowlBall)<Props>`
  background:
    ${props =>
    props.selected
      ? '#004'
      : props.$notSelected
        ? '#ddd'
        : 'radial-gradient(#fff, #004)'};
  cursor: ${props => props.noHover ? 'not-allowed' : 'pointer'};

  &:hover {
    ${props => !props.noHover && css`
      background: radial-gradient(#ccf, #ccf);
    `}
  }
`

export default TeamBall
