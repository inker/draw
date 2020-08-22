import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from 'react'

import {
  shuffle,
} from 'lodash'

import Team from 'model/team/GsTeam'

import usePopup from 'store/usePopup'
import useDrawId from 'store/useDrawId'
import useXRay from 'store/useXRay'

import useCollection from 'utils/hooks/useCollection'
import useTimer from 'utils/hooks/useTimer'
import useWorkerWrapper from 'utils/hooks/useWorkerWrapper'

import getGroupLetter from 'utils/getGroupLetter'

import MovingDiv from 'ui/MovingDiv'
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

const groupColors = [
  'rgba(255, 0, 0, 0.25)',
  'rgba(0, 128, 255, 0.25)',
]

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
}

function getInitialState(pots: readonly (readonly Team[])[]): State {
  const currentPotNum = 0
  const currentPot = pots[currentPotNum]
  return {
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: currentPot,
    possibleGroups: null,
    possibleGroupsShuffled: null,
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
  const groups = useMemo(
    () => initialPots[0].map(() => [] as Team[]) as readonly Team[][],
    [initialPots, drawId],
  )

  const [{
    currentPotNum,
    selectedTeam,
    pickedGroup,
    hungPot,
    possibleGroups,
    possibleGroupsShuffled,
  }, setState] = useState(() => getInitialState(pots))

  useEffect(() => {
    setState(getInitialState(pots))
  }, [pots])

  const [, setPopup] = usePopup()
  const [isXRay] = useXRay()
  const workerSendAndReceive = useWorkerWrapper<WorkerRequest, WorkerResponse>(EsWorker)
  const [airborneTeams, airborneTeamsActions] = useCollection<Team>()
  const [isTimedOut, timeoutActions] = useTimer<Team>(3000)

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
    })
  }, [pots, groups, currentPotNum, getPickedGroup])

  const onGroupBallPick = useCallback((newPickedGroup: number) => {
    if (!selectedTeam) {
      setPopup({
        error: 'No selected team...',
      })
      return
    }

    groups[newPickedGroup].push(selectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    airborneTeamsActions.add(selectedTeam)
    setState({
      selectedTeam: null,
      pickedGroup: newPickedGroup,
      hungPot: pots[newCurrentPotNum],
      possibleGroups: null,
      possibleGroupsShuffled: null,
      currentPotNum: newCurrentPotNum,
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
          maxTeams={pots.length}
          currentPotNum={currentPotNum}
          groups={groups}
          possibleGroups={possibleGroups}
          airborneTeams={airborneTeams}
          groupColors={groupColors}
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
          reset={setNewDrawId}
        />
        <GroupBowl
          display={!completed}
          displayGroups={isXRay}
          possibleGroups={possibleGroupsShuffled}
          onPick={onGroupBallPick}
        />
      </BowlsContainer>
      {airborneTeams.map((team: Team) => {
        const groupNum = groups.findIndex(g => g.includes(team))
        const groupLetter = getGroupLetter(groupNum)
        const pos = groups[groupNum].indexOf(team)
        return (
          <MovingDiv
            key={team.id}
            from={`[data-cellid='${team.id}']`}
            to={`[data-cellid='${groupLetter}${pos}']`}
            duration={350}
            data={team}
            onAnimationEnd={airborneTeamsActions.remove}
          />
        )
      })}
    </Root>
  )
}

export default memo(CLGS)
