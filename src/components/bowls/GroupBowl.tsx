import * as React from 'react'
import styled from 'styled-components'

import getGroupLetter from 'utils/getGroupLetter'
import Ball from './Ball'

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 999px) {
    justify-content: center;
  }
`

interface Props {
  completed: boolean,
  possibleGroups: number[] | null,
  onPick: any,
}

const GroupBowl: React.SFC<Props> = ({
  completed,
  possibleGroups,
  onPick,
}) => (
  <Root>
    {!completed && possibleGroups &&
      possibleGroups.map(groupNum => (
        <Ball
          data-group={groupNum}
          onClick={onPick}
        >
          {getGroupLetter(groupNum)}
        </Ball>
      ))
    }
  </Root>
)

export default GroupBowl
