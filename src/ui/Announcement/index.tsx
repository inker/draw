import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  memo,
} from 'react'

import styled from 'styled-components'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'
import StyledLink from 'ui/StyledLink'
import DivLink from 'ui/DivLink'
import NoTransitions from 'ui/NoTransitions'
import getGroupLetter from 'utils/getGroupLetter'

import PossibleGroups from './PossibleGroups'

const takeScreenshotPromise = (
  import(/* webpackChunkName: "screenshot", webpackPrefetch: true */ 'utils/takeScreenshot')
)

type Team = Club | NationalTeam

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

  const [downloadClicked, setDownloadClicked] = useState<null | 'png' | 'svg'>(null)

  useEffect(() => {
    lastSelected.current = completed ? null : selectedTeam
  }, [completed, selectedTeam])

  useEffect(() => {
    (async () => {
      if (!downloadClicked) {
        return
      }
      try {
        if (!groupsElement) {
          throw new Error('groups element is null')
        }
        const mod = await takeScreenshotPromise
        await mod.default(groupsElement, downloadClicked)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [downloadClicked])

  useEffect(() => {
    if (!completed) {
      setDownloadClicked(null)
    }
  }, [completed])

  const onDownloadPngClick = useCallback(() => setDownloadClicked('png'), [setDownloadClicked])
  const onDownloadSvgClick = useCallback(() => setDownloadClicked('svg'), [setDownloadClicked])

  const selected = (lastSelected.current ?? selectedTeam)!

  if (calculating) {
    return (
      <Root>
        <Bug>
          <div>
            Calculation is taking too long.
          </div>
          <div>
            And
            {' '}
            <StyledLink
              href={ISSUE_URL}
              target="_blank"
              rel="noopener"
            >
              here&apos;s why
            </StyledLink>
            .
          </div>
        </Bug>
      </Root>
    )
  }

  if (completed) {
    return (
      <Root>
        {downloadClicked && (
          <NoTransitions />
        )}
        <Completed>
          <div>Draw completed!</div>
          {completed && !isAirborneAnimation && !!groupsElement && (
            <>
              <DivLink onClick={onDownloadPngClick}>Download PNG</DivLink>
              <DivLink onClick={onDownloadSvgClick}>Download SVG</DivLink>
            </>
          )}
          <DivLink onClick={reset}>Restart</DivLink>
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
