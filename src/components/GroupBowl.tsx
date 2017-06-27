import * as React from 'react'
import styled from 'styled-components'

import { Team } from 'utils/team'
import Ball from './Ball'

const Root = styled.div`
  text-align: center;
  align-items: center;
  /*height: 300px;*/
  /*margin-left: 50px;*/
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
      possibleGroups.map(groupNum => {
        return (
          <Ball
            data-group={groupNum}
            onClick={onPick}
          >
            {String.fromCharCode(65 + groupNum)}
          </Ball>
        )
      })
    }
  </Root>
)

export default GroupBowl
