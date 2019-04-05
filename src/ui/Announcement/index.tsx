import React, { PureComponent } from 'react'
import styled from 'styled-components'

import StyledLink from 'ui/StyledLink'
import DivLink from 'ui/DivLink'
import Team from 'model/team'
import getGroupLetter from 'utils/getGroupLetter'

import PossibleGroups from './PossibleGroups'

const ISSUE_URL = 'https://github.com/inker/draw/issues/14'

const Root = styled.div`
  width: 100%;
  font-size: 1.25em;
  line-height: 150%;
  vertical-align: middle;

  margin-top: 30px;
  margin-bottom: 30px;

  user-select: none;

  @media (max-width: 999px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`

const Bug = styled.div`
  border-width: 2px;
  border-style: dashed;
  border-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`

const SelectedTeamWithColon = styled.span`
  display: inline-block;
`

const Bold = styled.strong`
  font-weight: 600;
`

const Completed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface Props {
  long: boolean,
  calculating?: boolean,
  completed: boolean,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  possibleGroups: number[] | null,
  numGroups: number,
  reset: any,
}

interface State {
  lastSelected: Team | null,
}

class Announcement extends PureComponent<Props, State> {
  private lastAnnouncement

  state: State = {
    lastSelected: null,
  }

  static getDerivedStateFromProps(nextProps: Props): Partial<State> | null {
    if (nextProps.completed) {
      return {
        lastSelected: null,
      }
    }
    if (nextProps.selectedTeam) {
      return {
        lastSelected: nextProps.selectedTeam,
      }
    }
    return null
  }

  render() {
    const {
      long,
      calculating,
      completed,
      selectedTeam,
      pickedGroup,
      possibleGroups,
      numGroups,
      reset,
    } = this.props

    const selected = this.state.lastSelected || selectedTeam

    if (calculating) {
      return (
        <Root>
          <Bug>
            <div>
              Calculation is taking too long.
            </div>
            <div>
              And <StyledLink href={ISSUE_URL} target="_blank" rel="noopener">here's why</StyledLink>.
            </div>
          </Bug>
        </Root>
      )
    }

    if (completed) {
      return (
        <Root>
          <Completed>
            <div>Draw completed!</div>
            <DivLink onClick={reset}>Restart</DivLink>
          </Completed>
        </Root>
      )
    }

    if (pickedGroup !== null) {
      this.lastAnnouncement = (
        <Root>
          <div>
            {long && selected ? (
              <span>
                <Bold>{selected.shortName || selected.name}</Bold> goes to group
              </span>
            ) : (
              <span>
                Group
              </span>
            )}
            &nbsp;
            <Bold>
              {getGroupLetter(pickedGroup)}
            </Bold>
            !
          </div>
        </Root>
      )
      return this.lastAnnouncement
    }

    if (selected) {
      return (
        <Root>
          {possibleGroups ? (
            <div>
              Possible groups for <SelectedTeamWithColon>
                <Bold>{selected.name}</Bold>:
              </SelectedTeamWithColon>
              <PossibleGroups
                numGroups={numGroups}
                possibleGroups={possibleGroups}
              />
            </div>
          ) : this.lastAnnouncement}
        </Root>
      )
    }

    return (
      <Root>
        Pick a ball
      </Root>
    )
  }
}

export default Announcement
