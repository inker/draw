import React, {
  useState,
  useCallback,
  useMemo,
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

import useTimer from 'utils/hooks/useTimer'
import useWorkerWrapper from 'utils/hooks/useWorkerWrapper'

import PotsContainer from 'ui/PotsContainer'
// import AirborneContainer from 'ui/AirborneContainer'
import GroupsContainer from 'ui/GroupsContainer'
import TablesContainer from 'ui/TablesContainer'
import BowlsContainer from 'ui/BowlsContainer'
import TeamBowl from 'ui/bowls/TeamBowl'
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
  pickedGroup: number,
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
    groups: pots[0].map(() => [] as Team[]),
  }
}

const ELGS = ({
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

    return response.pickedGroup
  }, [pots, groups, season, workerSendAndReceive])

  const onTeamSelected = async () => {
    if (!selectedTeam) {
      throw new Error('no selected team')
    }

    timeoutActions.set(selectedTeam)

    let newPickedGroup: number | undefined
    try {
      newPickedGroup = await getPickedGroup(selectedTeam)
    } catch (err) {
      console.error(err)
      setPopup({
        error: 'Could not determine the group',
      })
      return
    }

    const newGroups = groups.slice()
    newGroups[newPickedGroup] = [
      ...newGroups[newPickedGroup],
      selectedTeam,
    ]
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    timeoutActions.reset()
    setState({
      selectedTeam: null,
      pickedGroup: newPickedGroup,
      hungPot: pots[newCurrentPotNum],
      currentPotNum: newCurrentPotNum,
      groups: newGroups,
    })
  }

  const onTeamBallPick = useCallback((i: number) => {
    if (selectedTeam) {
      return
    }

    const currentPot = pots[currentPotNum]
    if (!currentPot[i]) {
      return
    }

    setState({
      currentPotNum,
      hungPot: currentPot.slice(),
      selectedTeam: currentPot.splice(i, 1)[0],
      pickedGroup: null,
      groups,
    })
  }, [pots, groups, currentPotNum])

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
          possibleGroups={null}
          getGroupHeaderStyles={getGroupHeaderStyles}
        />
      </TablesContainer>
      <BowlsContainer>
        <TeamBowl
          forceNoSelect={!!selectedTeam}
          display={!completed}
          displayTeams={isXRay}
          selectedTeam={selectedTeam}
          pot={hungPot}
          onPick={onTeamBallPick}
        />
        <Announcement
          long
          calculating={isTimedOut}
          completed={completed}
          selectedTeam={selectedTeam}
          pickedGroup={pickedGroup}
          possibleGroups={null}
          numGroups={groups.length}
          groupsElement={groupsContanerRef.current}
          reset={setNewDrawId}
        />
      </BowlsContainer>
    </Root>
  )
}

export default memo(ELGS)
