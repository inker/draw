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
  index: number,
  teams: readonly Team[],
  possible: boolean,
  groupLetter: string,
}

const GroupRow = ({
  index,
  teams,
  possible,
  groupLetter,
}: Props) => {
  const team = teams[index] as Club | NationalTeam | undefined
  return (
    <Row>
      <GroupCellContainer
        picked={!!team}
        possible={possible}
      >
        {team ? (
          <CellWithFlag country={getTeamCountryName(team)}>
            {(team as Club).shortName ?? team.name}
          </CellWithFlag>
        ) : (
          <DummyCell data-cellid={`${groupLetter}${index}`} />
        )}
      </GroupCellContainer>
    </Row>
  )
}

export default memo(GroupRow)
