import * as React from 'react'
import styled from 'styled-components'

import { Team } from 'utils/team'
import Group from './Group'

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > :nth-child(5) {
    clear: both;
    float: left;
    position: relative;
  }
  & > :nth-child(-n + ${({ numGroups }) => (numGroups ? numGroups >> 1 : 0)}) {
    background-color: #fee;
  }
  & > :nth-child(n + ${({ numGroups }) => (numGroups ? (numGroups >> 1) + 1 : 0)}) {
    background-color: #eef;
  }
`

interface Props {
  maxTeams: number,
  completed: boolean,
  currentPotNum: number,
  groups: Team[][],
  possibleGroups: number[] | null,
  pickedTeam: Team | null,
  airborneTeams: Team[],
}

const GroupsContainer = ({
  maxTeams,
  completed,
  currentPotNum,
  groups,
  possibleGroups,
  pickedTeam,
  airborneTeams,
}: Props) => (
  <Root numGroups={groups.length}>
    {groups && groups.map((group, i) => (
      <Group
        maxTeams={maxTeams}
        groupLetter={String.fromCharCode(65 + i)}
        teams={group}
        potNum={currentPotNum}
        possible={possibleGroups !== null && possibleGroups.includes(i)}
        airborneTeams={airborneTeams}
      />
    ))}
  </Root>
)

export default GroupsContainer
