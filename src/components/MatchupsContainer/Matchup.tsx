import React from 'react'
import styled from 'styled-components'

import Team from 'model/team'
import BaseCell from '../table/BaseCell'
import MatchupCell from './MatchupCell'

const Root = styled(BaseCell)`
  display: flex;
`

const Versus = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  height: 19px;
  text-align: center;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 12px;
  color: #444;
  :before {
    content: "v";
  }
`

const LeftCell = styled(MatchupCell)`
  border-right: 1px solid rgba(0, 0, 0, 0);
`

const RightCell = styled(MatchupCell)`
  border-left: 1px solid rgba(0, 0, 0, 0);
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
  const [ru, gw] = teams || [] as Team[]
  const ruIsPresent = ru && !airborneTeams.includes(ru)
  const gwIsPresent = gw && !airborneTeams.includes(gw)
  return (
    <Root>
      <LeftCell
        country={ruIsPresent && ru.country}
        picked={ruIsPresent}
        data-cellid={`${index}ru`}
      >
        {ruIsPresent && (ru.shortName || ru.name)}
      </LeftCell>
      <Versus />
      <RightCell
        country={gwIsPresent && gw.country}
        picked={gwIsPresent}
        data-cellid={`${index}gw`}
      >
        {gwIsPresent && (gw.shortName || gw.name)}
      </RightCell>
    </Root>
  )
}

export default Matchup
