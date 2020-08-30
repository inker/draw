import React, { memo } from 'react'
import styled, { css } from 'styled-components'

import Team from 'model/team/Club'

import Row from 'ui/table/Row'
import CellContainer from 'ui/table/CellContainer'
import Content from 'ui/table/Content'

import MatchupCell from './MatchupCell'

const leftCellContainerStyles = css`
  border-right: 1px solid rgba(0, 0, 0, 0);
`

const rightCellContainerStyles = css`
  border-left: 1px solid rgba(0, 0, 0, 0);
`

const VersusCell = styled(Content)`
  justify-content: center;
  width: 26px;
  color: #444;

  &::before {
    content: 'v';
  }
`

interface Props {
  teams: [Team, Team] | null,
}

const Matchup = ({
  teams,
}: Props) => {
  const [ru, gw] = teams ?? []!

  return (
    <Row>
      <MatchupCell
        team={ru}
        containerStyles={leftCellContainerStyles}
      />
      <CellContainer>
        <VersusCell />
      </CellContainer>
      <MatchupCell
        team={gw}
        containerStyles={rightCellContainerStyles}
      />
    </Row>
  )
}

export default memo(Matchup)
