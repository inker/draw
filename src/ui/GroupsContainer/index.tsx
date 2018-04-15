import React, { PureComponent } from 'react'
import styled from 'styled-components'

import getGroupLetter from 'utils/getGroupLetter'
import Team from 'model/team'
import Group from './Group'

const Root = styled.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`

interface Props {
  maxTeams: number,
  currentPotNum: number,
  groups: Team[][],
  possibleGroups: number[] | null,
  airborneTeams: Team[],
  groupColors?: string[],
}

class GroupsContainer extends PureComponent<Props> {
  render() {
    const {
      maxTeams,
      currentPotNum,
      groups,
      possibleGroups,
      airborneTeams,
      groupColors,
    } = this.props

    return (
      <Root
        numGroups={groups.length}
      >
        {groups && groups.map((group, i) => {
          const letter = getGroupLetter(i)
          let background: string | undefined
          if (groupColors) {
            background = groupColors && groupColors[~~(i / groups.length * groupColors.length)]
          }

          return (
            <Group
              key={letter}
              maxTeams={maxTeams}
              groupLetter={letter}
              teams={group}
              potNum={currentPotNum}
              possible={possibleGroups !== null && possibleGroups.includes(i)}
              airborneTeams={airborneTeams}
              background={background}
            />
          )
        })}
      </Root>
    )
  }
}

export default GroupsContainer
