import * as React from 'react'
import styled from 'styled-components'

import Team from 'model/team'
import Cell from './MatchupCell'

const Root = styled.div`
  display: flex;
  border-bottom: #aaa solid 1px;
`

interface Props {
  index: number,
  teams: [Team, Team] | null,
  potNum: number,
  airborneTeams: Team[],
}

const Matchup: React.SFC<Props> = ({
  index,
  teams,
  potNum,
  airborneTeams,
}) => {
  console.log(airborneTeams)
  const [ru, gw] = teams || [] as Team[]
  const ruIsPresent = ru && !airborneTeams.includes(ru)
  const gwIsPresent = gw && !airborneTeams.includes(gw)
  return (
    <Root>
      <Cell
        country={ruIsPresent && ru.country}
        picked
        data-cellid={`${index}ru`}
      >
        {ruIsPresent && (ru.shortName || ru.name)}
      </Cell>
      <div>
        v
      </div>
      <Cell
        country={gwIsPresent && gw.country}
        picked
        data-cellid={`${index}gw`}
      >
        {gwIsPresent && (gw.shortName || gw.name)}
      </Cell>
    </Root>
  )
}

export default Matchup
