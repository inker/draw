import React, {
  useState,
  useCallback,
  useEffect,
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
  possibleGroups: number[],
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
  pots: readonly (readonly Team[])[],
  groups: readonly (readonly Team[])[],
}

function getState(initialPots: readonly (readonly Team[])[]): State {
  const currentPotNum = 0
  const pots = initialPots.map(pot => shuffle(pot))
  const currentPot = pots[currentPotNum]
  return {
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: currentPot,
    possibleGroups: null,
    possibleGroupsShuffled: null,
    pots,
    groups: initialPots[0].map(() => [] as Team[]),
  }
}

const CLGS = ({
  season,
  pots: initialPots,
}: Props) => {
  const [drawId, setNewDrawId] = useDrawId()

  const [{
    currentPotNum,
    selectedTeam,
    pickedGroup,
    hungPot,
    possibleGroups,
    possibleGroupsShuffled,
    pots,
    groups,
  }, setState] = useState(() => getState(initialPots))

  useEffect(() => {
    setState(getState(initialPots))
  }, [initialPots, drawId])

  const [, setPopup] = usePopup()
  const [isXRay] = useXRay()
  const workerSendAndReceive = useWorkerWrapper<WorkerRequest, WorkerResponse>(EsWorker)

  const groupsContanerRef = useRef<HTMLElement>(null)

  const getGroupHeaderStyles = useCallback(
    (i: number) => i < (groups.length >> 1) ? redGroup : blueGroup,
    [groups.length],
  )

  const onTeamSelected = async () => {
    if (!selectedTeam) {
      throw new Error('no selected team')
    }

    let newPossibleGroups: number[] | undefined
    try {
      const response = await workerSendAndReceive({
        season,
        pots,
        groups,
        selectedTeam,
      })
      newPossibleGroups = response.possibleGroups
    } catch (err) {
      console.error(err)
      setPopup({
        error: 'Could not determine the group',
      })
      return
    }

    setState({
      selectedTeam,
      pickedGroup: null,
      hungPot,
      currentPotNum,
      possibleGroups: newPossibleGroups,
      possibleGroupsShuffled: shuffle(newPossibleGroups),
      pots,
      groups,
    })
  }

  const onTeamBallPick = useCallback((i: number) => {
    if (selectedTeam) {
      return
    }

    const currentPot = pots[currentPotNum]
    const newSelectedTeam = currentPot[i]
    if (!newSelectedTeam) {
      return
    }

    const newPots = pots.slice()
    newPots[currentPotNum] = newPots[currentPotNum].filter((_, idx) => idx !== i)

    setState({
      currentPotNum,
      hungPot: currentPot.slice(),
      selectedTeam: newSelectedTeam,
      possibleGroups,
      possibleGroupsShuffled,
      pickedGroup: null,
      pots: newPots,
      groups,
    })
  }, [pots, groups, currentPotNum, selectedTeam, possibleGroups, possibleGroupsShuffled])

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
      pots,
      groups: newGroups,
    })
  }, [pots, groups, selectedTeam, currentPotNum, hungPot])

  useEffect(() => {
    if (selectedTeam) {
      onTeamSelected()
    }
  }, [selectedTeam])

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
          completed={completed}
          selectedTeam={selectedTeam}
          pickedGroup={pickedGroup}
          possibleGroups={possibleGroups}
          isDisplayPossibleGroupsText={!!selectedTeam}
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
