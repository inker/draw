import styled from 'styled-components'

import Ball from './Ball'

interface Props {
  selected: boolean,
  notSelected: boolean,
}

const TeamBall = styled(Ball)<Props>`
  background: ${
    ({ selected, notSelected }) => selected ? '#004' : notSelected ? '#ddd' : 'radial-gradient(#fff, #004)'
  };
`

export default TeamBall
