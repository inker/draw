import * as React from 'react'
import styled from 'styled-components'

import { Team } from 'utils/team'

import Roundel from './Roundel'

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

const PossibleGroups = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
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
  reset: any,
}

const Announcement = ({
  completed,
  selectedTeam,
  pickedGroup,
  possibleGroups,
  reset,
}: Props) => (
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
          <PossibleGroups>
            {possibleGroups.map(i => (
              <Roundel color={i < 4 ? 'red' : 'blue'}>
                {String.fromCharCode(65 + i)}
              </Roundel>
            ))}
          </PossibleGroups>
        </div>
      ) :
      pickedGroup !== null ? `Group ${String.fromCharCode(65 + pickedGroup)}!` :
      'Pick a ball'
    }
  </Root>
)

export default Announcement
