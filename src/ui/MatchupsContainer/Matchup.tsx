import React, { memo } from 'react'
import styled, { css } from 'styled-components'

import Team from 'model/team/Club'

import Row from 'ui/table/Row'
import CellContainer from 'ui/table/CellContainer'
import Cell from 'ui/table/Cell'

import Content from './Content'

const leftCellContainerStyles = css`
  border-right: 1px solid rgba(0, 0, 0, 0);
`

const rightCellContainerStyles = css`
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
}

const Matchup = ({
  index,
  teams,
}: Props) => {
  const [ru, gw] = teams ?? []!

  return (
    <Row>
      <Content
        team={ru}
        containerStyles={leftCellContainerStyles}
      />
      <CellContainer>
        <VersusCell />
      </CellContainer>
      <Content
        team={gw}
        containerStyles={rightCellContainerStyles}
      />
    </Row>
  )
}

export default memo(Matchup)
