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

import usePartialState from 'utils/hooks/usePartialState'
import useCollectionActions from 'utils/hooks/useCollectionActions'
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
  const [state, setState] = usePartialState(initialState)

  const [error, setError] = useState<string | null>(null)
  const workerSendAndReceive = useWorkerWrapper(WcWorker)
  const [airborneTeams, airborneTeamsActions] = useCollectionActions<Team>()
  const [isLongCalculating, timeoutActions] = useTimeout<Team>(3000)

  useEffect(() => {
    if (state.selectedTeam) {
      onTeamSelected()
    }
  }, [state.selectedTeam])

  useEffect(() => {
    // pick host ball
    const { currentPotNum } = state
    const i = pots[currentPotNum].findIndex(team => team.host)
    onTeamBallPick(i)
  }, [drawId])

  const onReset = useCallback(() => {
    setDrawId(uniqueId('draw-'))
    setState(getState(initialPots))
  }, [initialPots])

  const getPickedGroup = useCallback(async (selectedTeam: Team) => {
    const {
      currentPotNum,
    } = state

    const { pickedGroup } = await workerSendAndReceive({
      pots,
      groups,
      selectedTeam,
      currentPotNum,
    })

    return pickedGroup as number
  }, [pots, groups, state.currentPotNum])

  const onTeamBallPick = useCallback(async (i: number) => {
    const {
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
  }, [pots, state.currentPotNum])

  const onTeamSelected = useCallback(async () => {
    const {
      selectedTeam,
    } = state

    if (!selectedTeam) {
      throw new Error('no selected team')
    }

    timeoutActions.set(selectedTeam)

    let pickedGroup: number | undefined
    try {
      pickedGroup = await getPickedGroup(selectedTeam)
    } catch (err) {
      console.error(err)
      setError('Could not determine the group')
      return
    }

    onGroupPick(selectedTeam, pickedGroup)
  }, [state.selectedTeam])

  const onGroupPick = useCallback((selectedTeam: Team, pickedGroup: number) => {
    const {
      currentPotNum,
    } = state

    if (!selectedTeam) {
      setError('No selected team...')
      return
    }

    groups[pickedGroup].push(selectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    airborneTeamsActions.add(selectedTeam)
    timeoutActions.reset()
    setState({
      selectedTeam: null,
      pickedGroup,
      hungPot: pots[newCurrentPotNum],
      currentPotNum: newCurrentPotNum,
      calculating: false,
      completed: newCurrentPotNum >= pots.length,
    })
  }, [pots, groups, state.currentPotNum])

  return (
    <Root>
      <TablesContainer>
        <PotsContainer
          selectedTeams={state.selectedTeam && [state.selectedTeam]}
          initialPots={initialPots}
          pots={pots}
          currentPotNum={state.currentPotNum}
        />
        <GroupsContainer
          maxTeams={pots.length}
          currentPotNum={state.currentPotNum}
          groups={groups}
          possibleGroups={null}
          airborneTeams={airborneTeams}
          groupColors={groupColors}
        />
      </TablesContainer>
      <BowlsContainer>
        <TeamBowl
          forceNoSelect={state.calculating}
          display={!state.completed}
          selectedTeam={state.selectedTeam}
          pot={state.hungPot}
          onPick={onTeamBallPick}
        />
        <Announcement
          long
          calculating={isLongCalculating}
          completed={state.completed}
          selectedTeam={state.selectedTeam}
          pickedGroup={state.pickedGroup}
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
