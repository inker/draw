import React, { memo } from 'react'
import styled from 'styled-components'

import Team from 'model/team/Club'

import Row from 'ui/table/Row'
import CellContainer from 'ui/table/CellContainer'
import Cell from 'ui/table/Cell'
import CellWithFlag from 'ui/table/CellWithFlag'
import DummyCell from 'ui/table/DummyCell'

import MatchupCellContainer from './MatchupCellContainer'

const LeftCellContainer = styled(MatchupCellContainer)`
  border-right: 1px solid rgba(0, 0, 0, 0);
`

const RightCellContainer = styled(MatchupCellContainer)`
  border-left: 1px solid rgba(0, 0, 0, 0);
`

const VersusCell = styled(Cell)`
  justify-content: center;
  width: 26px;
  color: #444;

  &::before {
    content: 'v';
  }
`

interface Props {
  index: number,
  teams: [Team, Team] | null,
  airborneTeams: readonly Team[],
}

const Matchup = ({
  index,
  teams,
  airborneTeams,
}: Props) => {
  const [ru, gw] = teams ?? []!
  const ruIsPresent = ru && !airborneTeams.includes(ru)
  const gwIsPresent = gw && !airborneTeams.includes(gw)

  return (
    <Row>
      <LeftCellContainer hasTeam={ruIsPresent}>
        {ruIsPresent ? (
          <CellWithFlag country={ruIsPresent ? ru.country : undefined}>
            {ruIsPresent && (ru.shortName ?? ru.name)}
          </CellWithFlag>
        ) : (
          <DummyCell data-cellid={`${index}ru`} />
        )}
      </LeftCellContainer>
      <CellContainer>
        <VersusCell />
      </CellContainer>
      <RightCellContainer hasTeam={gwIsPresent}>
        {gwIsPresent ? (
          <CellWithFlag country={gwIsPresent ? gw.country : undefined}>
            {ruIsPresent && (gw.shortName ?? gw.name)}
          </CellWithFlag>
        ) : (
          <DummyCell data-cellid={`${index}gw`} />
        )}
      </RightCellContainer>
    </Row>
  )
}

export default memo(Matchup)
