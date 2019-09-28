import styled from 'styled-components'

import BowlBall from '../BowlBall'

const GroupBowl = styled(BowlBall)`
  &:hover {
    ${props => !props.noHover && 'background: radial-gradient(#ccf, #ccf)'};
  }
`

export default GroupBowl
