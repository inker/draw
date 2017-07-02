import * as React from 'react'
import styled from 'styled-components'

import { Team } from 'utils/team'
import Group from './Group'

const Root = styled.div`
  display: flex;
  flex-flow: row wrap;
  & > * {
    flex: 1;
    flex-basis: 22%;
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
  currentPotNum: number,
  groups: Team[][],
  possibleGroups: number[] | null,
  selectedTeam: Team | null,
  airborneTeams: Team[],
}

const GroupsContainer = ({
  maxTeams,
  currentPotNum,
  groups,
  possibleGroups,
  selectedTeam,
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
