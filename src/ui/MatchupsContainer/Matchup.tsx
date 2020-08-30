import React, { memo } from 'react'
import styled, { css } from 'styled-components'

import Team from 'model/team/Club'

import Row from 'ui/table/Row'
import Cell from 'ui/table/Cell'
import Content from 'ui/table/Content'

import MatchupCellDeferred from './MatchupCellDeferred'

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
      <MatchupCellDeferred
        team={ru}
        containerStyles={leftCellContainerStyles}
      />
      <Cell>
        <VersusCell />
      </Cell>
      <MatchupCellDeferred
        team={gw}
        containerStyles={rightCellContainerStyles}
      />
    </Row>
  )
}

export default memo(Matchup)
