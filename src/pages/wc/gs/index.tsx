import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  memo,
} from 'react'

import {
  shuffle,
  uniqueId,
} from 'lodash'

import Team from 'model/team/NationalTeam'

import usePopup from 'store/usePopup'

import usePartialState from 'utils/hooks/usePartialState'
import useCollection from 'utils/hooks/useCollection'
import useTimeout from 'utils/hooks/useTimeout'
import useWorkerWrapper from 'utils/hooks/useWorkerWrapper'

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
  'rgba(0, 128, 0, 0.25)',
]

interface Props {
  pots: Team[][],
}

interface State {
  currentPotNum: number,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  hungPot: Team[],
  calculating: boolean,
  completed: boolean,
}

function getState(pots: Team[][]): State {
  const currentPotNum = 0
  const currentPot = pots[currentPotNum]
  return {
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: currentPot,
    calculating: false,
    completed: false,
  }
}

const WCGS = ({
  pots: initialPots,
}: Props) => {
  const [drawId, setDrawId] = useState(uniqueId('draw-'))
  const pots = useMemo(() => initialPots.map(pot => shuffle(pot)), [initialPots, drawId])
  const groups = useMemo(() => initialPots[0].map(team => [] as Team[]), [initialPots, drawId])

  const initialState = useMemo(() => getState(pots), [pots])
  const [{
    currentPotNum,
    selectedTeam,
    pickedGroup,
    hungPot,
    calculating,
    completed,
  }, setState] = usePartialState(initialState)

  const [, setPopup] = usePopup()
  const workerSendAndReceive = useWorkerWrapper(WcWorker)
  const [airborneTeams, airborneTeamsActions] = useCollection<Team>()
  const [isLongCalculating, timeoutActions] = useTimeout<Team>(3000)

  useEffect(() => {
    if (selectedTeam) {
      onTeamSelected()
    }
  }, [selectedTeam])

  useEffect(() => {
    // pick host ball
    const i = pots[currentPotNum].findIndex(team => team.host)
    onTeamBallPick(i)
  }, [drawId])

  const onReset = useCallback(() => {
    setDrawId(uniqueId('draw-'))
    setState(getState(initialPots))
  }, [initialPots])

  const getPickedGroup = useCallback(async (newSelectedTeam: Team) => {
    const response = await workerSendAndReceive({
      pots,
      groups,
      selectedTeam: newSelectedTeam,
      currentPotNum,
    })

    return response.pickedGroup as number
  }, [pots, groups, currentPotNum])

  const onTeamBallPick = useCallback(async (i: number) => {
    const currentPot = pots[currentPotNum]

    setState({
      hungPot: currentPot.slice(),
      selectedTeam: currentPot.splice(i, 1)[0],
      pickedGroup: null,
      calculating: true,
    })
  }, [pots, currentPotNum])

  const onTeamSelected = useCallback(async () => {
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

    onGroupPick(selectedTeam, newPickedGroup)
  }, [selectedTeam])

  const onGroupPick = useCallback((newSelectedTeam: Team, newPickedGroup: number) => {
    if (!newSelectedTeam) {
      setPopup({
        error: 'No selected team...',
      })
      return
    }

    groups[newPickedGroup].push(newSelectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    airborneTeamsActions.add(newSelectedTeam)
    timeoutActions.reset()
    setState({
      selectedTeam: null,
      pickedGroup: newPickedGroup,
      hungPot: pots[newCurrentPotNum],
      currentPotNum: newCurrentPotNum,
      calculating: false,
      completed: newCurrentPotNum >= pots.length,
    })
  }, [pots, groups, currentPotNum])

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
          forceNoSelect={calculating}
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
        const pos = groups[groupNum].indexOf(team)
        return (
          <MovingDiv
            key={team.id}
            from={`[data-cellid='${team.id}']`}
            to={`[data-cellid='${getGroupLetter(groupNum)}${pos}']`}
            duration={350}
            data={team}
            onAnimationEnd={airborneTeamsActions.remove}
          />
        )
      })}
    </Root>
  )
}

export default memo(WCGS)
