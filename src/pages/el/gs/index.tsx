import React, {
  useCallback,
  useMemo,
  useEffect,
  memo,
} from 'react'

import delay from 'delay.js'
import {
  shuffle,
  uniqueId,
} from 'lodash'

import Team from 'model/team/GSTeam'

import WorkerWrapper from 'utils/WorkerWrapper'
import usePartialState from 'utils/hooks/usePartialState'
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
import useAirborneTeamsReducer, {
  types as airborneTeamsTypes,
} from 'pages/useAirborneTeamsReducer'
import useLongCalculatingReducer, {
  types as longCalculatingTypes,
} from 'pages/useLongCalculatingReducer'

// @ts-ignore
import EsWorker from './worker'

const groupColors = [
  'rgba(255, 0, 0, 0.25)',
  'rgba(0, 128, 255, 0.25)',
]

interface Props {
  pots: Team[][],
}

interface State {
  drawId: string,
  pots: Team[][],
  groups: Team[][],
  currentPotNum: number,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  hungPot: Team[],
  calculating: boolean,
  completed: boolean,
  error: string | null,
}

function getState(initialPots: Team[][]): State {
  const currentPotNum = 0
  const pots = initialPots.map(pot => shuffle(pot))
  const currentPot = pots[currentPotNum]
  return {
    drawId: uniqueId('draw-'),
    pots,
    groups: currentPot.map(team => []),
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: currentPot,
    calculating: false,
    completed: false,
    error: null,
  }
}

const ELGS = ({
  pots: initialPots,
}: Props) => {
  const ww = useMemo(() => new WorkerWrapper(new EsWorker(), 120000), [])

  const initialState = useMemo(() => getState(initialPots), [initialPots])
  const [longCalculating, dispatchLongCalculating] = useLongCalculatingReducer()
  const [state, setState] = usePartialState(initialState)
  const [airborneTeams, dispatchAirborne] = useAirborneTeamsReducer()

  useEffect(() => {
    return () => {
      ww.terminate()
    }
  }, [])

  useEffect(() => {
    if (state.selectedTeam) {
      onTeamSelected()
    }
  }, [state])

  const onReset = useCallback(() => {
    setState(getState(initialPots))
  }, [initialPots])

  const runCalculatingTimer = useCallback(async (oldSelectedTeam: Team) => {
    dispatchLongCalculating({
      type: longCalculatingTypes.set,
      payload: oldSelectedTeam,
    })
    await delay(3000)
    dispatchLongCalculating({
      type: longCalculatingTypes.set,
      payload: oldSelectedTeam,
    })
  }, [])

  const getPickedGroup = useCallback(async (selectedTeam: Team) => {
    const {
      pots,
      groups,
      currentPotNum,
    } = state

    const { pickedGroup } = await ww.sendAndReceive({
      pots,
      groups,
      selectedTeam,
      currentPotNum,
    })

    return pickedGroup as number
  }, [state])

  const onTeamBallPick = useCallback(async (i: number) => {
    const {
      pots,
      currentPotNum,
    } = state

    const currentPot = pots[currentPotNum]
    const hungPot = currentPot.slice()
    const selectedTeam = currentPot.splice(i, 1)[0]

    setState({
      hungPot,
      selectedTeam,
      pickedGroup: null,
      calculating: true,
    })
  }, [state])

  const onTeamSelected = useCallback(async () => {
    const {
      selectedTeam,
    } = state

    if (!selectedTeam) {
      throw new Error('no selected team')
    }

    runCalculatingTimer(selectedTeam)

    let pickedGroup: number | undefined
    try {
      pickedGroup = await getPickedGroup(selectedTeam)
    } catch (err) {
      console.error(err)
      setState({
        error: 'Could not determine the group',
      })
      return
    }

    onGroupPick(selectedTeam, pickedGroup)
  }, [state])

  const onGroupPick = useCallback((selectedTeam: Team, pickedGroup: number) => {
    const {
      pots,
      groups,
      currentPotNum,
    } = state

    if (!selectedTeam) {
      setState({
        error: 'shit',
      })
      return
    }

    groups[pickedGroup].push(selectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    dispatchAirborne({
      type: airborneTeamsTypes.add,
      payload: selectedTeam,
    })
    dispatchLongCalculating({
      type: longCalculatingTypes.reset,
    })
    setState({
      selectedTeam: null,
      pickedGroup,
      hungPot: pots[newCurrentPotNum],
      currentPotNum: newCurrentPotNum,
      calculating: false,
      completed: newCurrentPotNum >= pots.length,
    })
  }, [state])

  const onAnimationEnd = useCallback((teamData: Team) => {
    dispatchAirborne({
      type: airborneTeamsTypes.remove,
      payload: teamData,
    })
  }, [])

  return (
    <Root>
      <TablesContainer>
        <PotsContainer
          selectedTeams={state.selectedTeam && [state.selectedTeam]}
          initialPots={initialPots}
          pots={state.pots}
          currentPotNum={state.currentPotNum}
        />
        <GroupsContainer
          maxTeams={state.pots.length}
          currentPotNum={state.currentPotNum}
          groups={state.groups}
          possibleGroups={null}
          airborneTeams={airborneTeams}
          groupColors={groupColors}
        />
      </TablesContainer>
      <BowlsContainer>
        <TeamBowl
          calculating={state.calculating}
          completed={state.completed}
          selectedTeam={state.selectedTeam}
          pot={state.hungPot}
          onPick={onTeamBallPick}
        />
        <Announcement
          long
          calculating={longCalculating.isLong}
          completed={state.completed}
          selectedTeam={state.selectedTeam}
          pickedGroup={state.pickedGroup}
          possibleGroups={null}
          numGroups={state.groups.length}
          reset={onReset}
        />
      </BowlsContainer>
      {airborneTeams.map((team: Team) => {
        const { groups } = state
        const groupNum = groups.findIndex(g => g.includes(team))
        const pos = groups[groupNum].indexOf(team)
        return (
          <MovingDiv
            key={team.id}
            from={`[data-cellid='${team.id}']`}
            to={`[data-cellid='${getGroupLetter(groupNum)}${pos}']`}
            duration={350}
            data={team}
            onAnimationEnd={onAnimationEnd}
          />
        )
      })}
    </Root>
  )
}

export default memo(ELGS)
