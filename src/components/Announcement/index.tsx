import * as React from 'react'
import styled from 'styled-components'

import { Team } from 'utils/team'
import getGroupLetter from 'utils/getGroupLetter'

import PossibleGroups from './PossibleGroups'

const Root = styled.div`
  width: 100%;
  font-size: 1.25em;
  line-height: 150%;
  vertical-align: middle;

  margin-top: 30px;
  margin-bottom: 30px;

  user-select: none;

  @media (max-width: 999px) {
    font-size: 2.5em;
  }
`

const SelectedTeamWithColon = styled.span`
  display: inline-block;
`

const SelectedTeam = styled.span`
  font-weight: bold;
`

const Link = styled.div`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`

const Completed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface Props {
  completed: boolean,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  possibleGroups: number[] | null,
  numGroups: number,
  reset: any,
}

const Announcement: React.SFC<Props> = ({
  completed,
  selectedTeam,
  pickedGroup,
  possibleGroups,
  numGroups,
  reset,
}) => (
  <Root>
    {
      completed ? (
        <Completed>
          <div>Draw completed!</div>
          <Link onClick={reset}>Restart</Link>
        </Completed>
      ) :
      selectedTeam && possibleGroups ? (
        <div>
          Possible groups for <SelectedTeamWithColon>
            <SelectedTeam>{selectedTeam.name}</SelectedTeam>:
          </SelectedTeamWithColon>
          <PossibleGroups
            numGroups={numGroups}
            possibleGroups={possibleGroups}
          />
        </div>
      ) :
      pickedGroup !== null ? `Group ${getGroupLetter(pickedGroup)}!` :
      'Pick a ball'
    }
  </Root>
)

export default Announcement
