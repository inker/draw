import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  memo,
} from 'react'

import {
  shuffle,
} from 'lodash'

import Team from 'model/team/GsTeam'

import usePopup from 'store/usePopup'

import useCollection from 'utils/hooks/useCollection'
import useTimeout from 'utils/hooks/useTimeout'
import useWorkerWrapper from 'utils/hooks/useWorkerWrapper'
import useUniqueId from 'utils/hooks/useUniqueId'

import getGroupLetter from 'utils/getGroupLetter'

import MovingDiv from 'ui/MovingDiv'
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
}

function getState(pots: readonly (readonly Team[])[]): State {
  const currentPotNum = 0
  const currentPot = pots[currentPotNum]
  return {
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: currentPot,
  }
}

const ELGS = ({
  season,
  pots: initialPots,
}: Props) => {
  const [drawId, setNewDrawId] = useUniqueId('draw-')
  const pots = useMemo(() => initialPots.map(pot => shuffle(pot)), [initialPots, drawId])
  const groups = useMemo(() => initialPots[0].map(() => [] as Team[]), [initialPots, drawId])

  const initialState = useMemo(() => getState(pots), [pots])
  const [{
    currentPotNum,
    selectedTeam,
    pickedGroup,
    hungPot,
  }, setState] = useState(initialState)

  const [, setPopup] = usePopup()
  const workerSendAndReceive = useWorkerWrapper<WorkerRequest, WorkerResponse>(EsWorker)
  const [airborneTeams, airborneTeamsActions] = useCollection<Team>()
  const [isLongCalculating, timeoutActions] = useTimeout<Team>(3000)

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

    groups[newPickedGroup].push(selectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    airborneTeamsActions.add(selectedTeam)
    timeoutActions.reset()
    setState({
      selectedTeam: null,
      pickedGroup: newPickedGroup,
      hungPot: pots[newCurrentPotNum],
      currentPotNum: newCurrentPotNum,
    })
  }

  const onTeamBallPick = useCallback(async (i: number) => {
    const currentPot = pots[currentPotNum]

    setState({
      currentPotNum,
      hungPot: currentPot.slice(),
      selectedTeam: currentPot.splice(i, 1)[0],
      pickedGroup: null,
    })
  }, [pots, currentPotNum])

  useEffect(() => {
    if (selectedTeam) {
      onTeamSelected()
    }
  }, [selectedTeam])

  const onReset = useCallback(() => {
    setNewDrawId()
    setState(getState(initialPots))
  }, [initialPots])

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
          possibleGroups={null}
          airborneTeams={airborneTeams}
          groupColors={groupColors}
        />
      </TablesContainer>
      <BowlsContainer>
        <TeamBowl
          forceNoSelect={!!selectedTeam}
          display={!completed}
          selectedTeam={selectedTeam}
          pot={hungPot}
          onPick={onTeamBallPick}
        />
        <Announcement
          long
          calculating={isLongCalculating}
          completed={completed}
          selectedTeam={selectedTeam}
          pickedGroup={pickedGroup}
          possibleGroups={null}
          numGroups={groups.length}
          reset={onReset}
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

export default memo(ELGS)
