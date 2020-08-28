import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  memo,
} from 'react'

import { css } from 'styled-components'

import {
  shuffle,
} from 'lodash'

import Team from 'model/team/GsTeam'

import usePopup from 'store/usePopup'
import useDrawId from 'store/useDrawId'
import useXRay from 'store/useXRay'

import useTimer from 'utils/hooks/useTimer'
import useWorkerWrapper from 'utils/hooks/useWorkerWrapper'

import PotsContainer from 'ui/PotsContainer'
// import AirborneContainer from 'ui/AirborneContainer'
import GroupsContainer from 'ui/GroupsContainer'
import TablesContainer from 'ui/TablesContainer'
import BowlsContainer from 'ui/BowlsContainer'
import TeamBowl from 'ui/bowls/TeamBowl'
import GroupBowl from 'ui/bowls/GroupBowl'
import Announcement from 'ui/Announcement'

import Root from 'pages/Root'

// @ts-ignore
import EsWorker from './worker'

const redGroup = css`
  background-color: #ffc0c0;
`

const blueGroup = css`
  background-color: #c0e0ff;
`

interface WorkerRequest {
  season: number,
  pots: readonly (readonly Team[])[],
  groups: readonly (readonly Team[])[],
  selectedTeam: Team,
}

interface WorkerResponse {
  possibleGroups: readonly number[],
}

interface Props {
  season: number,
  pots: readonly (readonly Team[])[],
}

interface State {
  currentPotNum: number,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  hungPot: readonly Team[],
  possibleGroups: readonly number[] | null,
  possibleGroupsShuffled: readonly number[] | null,
  groups: readonly (readonly Team[])[],
}

function getState(pots: readonly (readonly Team[])[]): State {
  const currentPotNum = 0
  const currentPot = pots[currentPotNum]
  return {
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: currentPot,
    possibleGroups: null,
    possibleGroupsShuffled: null,
    groups: pots[0].map(() => [] as Team[]),
  }
}

const CLGS = ({
  season,
  pots: initialPots,
}: Props) => {
  const [drawId, setNewDrawId] = useDrawId()

  const pots = useMemo(
    () => initialPots.map(pot => shuffle(pot)) as readonly Team[][],
    [initialPots, drawId],
  )

  const [{
    currentPotNum,
    selectedTeam,
    pickedGroup,
    hungPot,
    possibleGroups,
    possibleGroupsShuffled,
    groups,
  }, setState] = useState(() => getState(pots))

  useEffect(() => {
    setState(getState(pots))
  }, [pots])

  const [, setPopup] = usePopup()
  const [isXRay] = useXRay()
  const workerSendAndReceive = useWorkerWrapper<WorkerRequest, WorkerResponse>(EsWorker)
  const [isTimedOut, timeoutActions] = useTimer<Team>(3000)

  const groupsContanerRef = useRef<HTMLElement>(null)

  const getGroupHeaderStyles = useCallback(
    (i: number) => i < (groups.length >> 1) ? redGroup : blueGroup,
    [groups.length],
  )

  const getPickedGroup = useCallback(async (newSelectedTeam: Team) => {
    const response = await workerSendAndReceive({
      season,
      pots,
      groups,
      selectedTeam: newSelectedTeam,
    })

    return response.possibleGroups
  }, [pots, groups, season, workerSendAndReceive])

  const onTeamBallPick = useCallback(async (i: number) => {
    if (selectedTeam) {
      return
    }

    const currentPot = pots[currentPotNum]
    if (!currentPot[i]) {
      return
    }

    const newSelectedTeam = currentPot.splice(i, 1)[0]

    timeoutActions.set(newSelectedTeam)
    const newPossibleGroups = await getPickedGroup(newSelectedTeam)
    timeoutActions.reset()

    setState({
      currentPotNum,
      hungPot: currentPot.slice(),
      selectedTeam: newSelectedTeam,
      possibleGroups: newPossibleGroups,
      possibleGroupsShuffled: shuffle(newPossibleGroups),
      pickedGroup: null,
      groups,
    })
  }, [pots, groups, currentPotNum, getPickedGroup])

  const onGroupBallPick = useCallback((newPickedGroup: number) => {
    if (!selectedTeam) {
      setPopup({
        error: 'No selected team...',
      })
      return
    }

    const newGroups = groups.slice()
    newGroups[newPickedGroup] = [
      ...newGroups[newPickedGroup],
      selectedTeam,
    ]
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    setState({
      selectedTeam: null,
      pickedGroup: newPickedGroup,
      hungPot: pots[newCurrentPotNum],
      possibleGroups: null,
      possibleGroupsShuffled: null,
      currentPotNum: newCurrentPotNum,
      groups: newGroups,
    })
  }, [pots, groups, selectedTeam, currentPotNum])

  const completed = currentPotNum >= pots.length

  return (
    <Root>
      <TablesContainer>
        <PotsContainer
          selectedTeams={selectedTeam && [selectedTeam]}
          initialPots={initialPots}
          pots={pots}
          currentPotNum={currentPotNum}
        />
        <GroupsContainer
          ref={groupsContanerRef}
          maxTeams={pots.length}
          currentPotNum={currentPotNum}
          groups={groups}
          possibleGroups={possibleGroups}
          getGroupHeaderStyles={getGroupHeaderStyles}
        />
      </TablesContainer>
      <BowlsContainer>
        <TeamBowl
          display={!completed}
          displayTeams={isXRay}
          selectedTeam={selectedTeam}
          pot={hungPot}
          onPick={onTeamBallPick}
        />
        <Announcement
          long={false}
          calculating={isTimedOut}
          completed={completed}
          selectedTeam={selectedTeam}
          pickedGroup={pickedGroup}
          possibleGroups={possibleGroups}
          numGroups={groups.length}
          groupsElement={groupsContanerRef.current}
          reset={setNewDrawId}
        />
        <GroupBowl
          display={!completed}
          displayGroups={isXRay}
          possibleGroups={possibleGroupsShuffled}
          onPick={onGroupBallPick}
        />
      </BowlsContainer>
    </Root>
  )
}

export default memo(CLGS)
