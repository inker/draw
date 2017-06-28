import * as React from 'react'
import styled from 'styled-components'

import { Team } from 'utils/team'

const Root = styled.div`
  width: 100%;
  height: 50px;
  font-size: 1.25em;
  vertical-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
  user-select: none;

  @media (max-width: 999px) {
    height: 80px;
    font-size: 2.5em;
  }
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
  pickedTeam: Team | null,
  pickedGroup: number | null,
  possiblesText: string,
  reset: any,
}

const Announcement = ({
  completed,
  pickedTeam,
  pickedGroup,
  possiblesText,
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
      possiblesText && pickedTeam ? (
        <div>
          Possible groups for {pickedTeam.name}:
          <br />
          {possiblesText}
        </div>
      ) :
      pickedGroup !== null ? `Group ${String.fromCharCode(65 + pickedGroup)}!` :
      'Pick a ball'
    }
  </Root>
)

export default Announcement
