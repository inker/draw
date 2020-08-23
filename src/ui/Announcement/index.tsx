import React, {
  useEffect,
  useRef,
  memo,
} from 'react'

import styled from 'styled-components'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'
import ButtonLink from 'ui/ButtonLink'
import getGroupLetter from 'utils/getGroupLetter'

import PossibleGroups from './PossibleGroups'
import LongCalculation from './LongCalculation'
import Download from './Download'

type Team = Club | NationalTeam

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

  & > * + * {
    margin-top: 12px;
  }
`

interface Props {
  long: boolean,
  calculating?: boolean,
  completed: boolean,
  isAirborneAnimation: boolean,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  possibleGroups: readonly number[] | null,
  numGroups: number,
  groupsElement: HTMLElement | null,
  reset: any,
}

const Announcement = ({
  long,
  calculating,
  completed,
  isAirborneAnimation,
  selectedTeam,
  pickedGroup,
  possibleGroups,
  numGroups,
  groupsElement,
  reset,
}: Props) => {
  const lastAnnouncement = useRef<React.ReactElement | null>(null)
  const lastSelected = useRef<Team | null>(null)

  useEffect(() => {
    lastSelected.current = completed ? null : selectedTeam
  }, [completed, selectedTeam])

  const selected = (lastSelected.current ?? selectedTeam)!

  if (calculating) {
    return (
      <Root>
        <LongCalculation />
      </Root>
    )
  }

  if (completed) {
    return (
      <Root>
        <Completed>
          <div>Draw completed!</div>
          {!isAirborneAnimation && (
            <Download
              completed={completed}
              groupsElement={groupsElement}
            />
          )}
          <ButtonLink onClick={reset}>Restart</ButtonLink>
        </Completed>
      </Root>
    )
  }

  if (pickedGroup !== null) {
    lastAnnouncement.current = (
      <Root>
        <div>
          {long && selected ? (
            <span>
              <Bold>{(selected as Club).shortName ?? selected.name}</Bold> goes to group
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
    return lastAnnouncement.current
  }

  if (selected) {
    return (
      <Root>
        {possibleGroups ? (
          <div>
            Possible groups for
            {' '}
            <SelectedTeamWithColon>
              <Bold>{selected.name}</Bold>:
            </SelectedTeamWithColon>
            <PossibleGroups
              numGroups={numGroups}
              possibleGroups={possibleGroups}
            />
          </div>
        ) : lastAnnouncement.current}
      </Root>
    )
  }

  return (
    <Root>
      Pick a ball
    </Root>
  )
}

export default memo(Announcement)
