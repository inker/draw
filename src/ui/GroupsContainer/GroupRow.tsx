import React, { memo } from 'react'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import Row from 'ui/table/Row'
import CellWithFlag from 'ui/table/CellWithFlag'
import DummyCell from 'ui/table/DummyCell'

import GroupCellContainer from './GroupCellContainer'
import getTeamCountryName from './getTeamCountryName'

type Team = Club | NationalTeam

interface Props {
  team?: Team,
  possible: boolean,
  cellId: string,
}

const GroupRow = ({
  team,
  possible,
  cellId,
}: Props) => (
  <Row>
    <GroupCellContainer
      hasTeam={!!team}
      possible={possible}
    >
      {team ? (
        <CellWithFlag country={getTeamCountryName(team)}>
          {(team as Club).shortName ?? team.name}
        </CellWithFlag>
      ) : (
        <DummyCell data-cellid={cellId} />
      )}
    </GroupCellContainer>
  </Row>
)

export default memo(GroupRow)
