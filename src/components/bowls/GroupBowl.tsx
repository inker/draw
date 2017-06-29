import * as React from 'react'
import styled from 'styled-components'

import { Team } from 'utils/team'
import Ball from './Ball'

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

interface Props {
  completed: boolean,
  possibleGroups: number[] | null,
  onPick: any,
}

const GroupBowl = ({
  completed,
  possibleGroups,
  onPick,
}: Props) => (
  <Root>
    {!completed && possibleGroups &&
      possibleGroups.map(groupNum => (
        <Ball
          data-group={groupNum}
          onClick={onPick}
        >
          {String.fromCharCode(65 + groupNum)}
        </Ball>
      ))
    }
  </Root>
)

export default GroupBowl
