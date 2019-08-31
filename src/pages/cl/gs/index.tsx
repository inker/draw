import React, {
  useState,
  useCallback,
  useMemo,
  memo,
} from 'react'

import {
  shuffle,
  uniqueId,
} from 'lodash'

import Team from 'model/team/GSTeam'

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
import GroupBowl from 'ui/bowls/GroupBowl'
import Announcement from 'ui/Announcement'

import Root from 'pages/Root'

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
  currentPotNum: number,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  hungPot: Team[],
  possibleGroups: number[] | null,
  possibleGroupsShuffled: number[] | null,
}

function getState(pots: Team[][]): State {
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
    possibleGroups,
    possibleGroupsShuffled,
  }, setState] = usePartialState(initialState)

  const [, setPopup] = usePopup()
  const workerSendAndReceive = useWorkerWrapper(EsWorker)
  const [airborneTeams, airborneTeamsActions] = useCollection<Team>()
  const [isLongCalculating, timeoutActions] = useTimeout<Team>(3000)

  const onReset = useCallback(() => {
    setDrawId(uniqueId('draw-'))
    setState(getState(initialPots))
  }, [initialPots])

  const getPickedGroup = async (newSelectedTeam: Team) => {
    const response = await workerSendAndReceive({
      pots,
      groups,
      selectedTeam: newSelectedTeam,
    })

    return response.possibleGroups as number[]
  }

  const onTeamBallPick = useCallback(async (i: number) => {
    const currentPot = pots[currentPotNum]
    const newSelectedTeam = currentPot.splice(i, 1)[0]

    timeoutActions.set(newSelectedTeam)
    const newPossibleGroups = await getPickedGroup(newSelectedTeam)
    timeoutActions.reset()

    setState({
      hungPot: currentPot.slice(),
      selectedTeam: newSelectedTeam,
      possibleGroups: newPossibleGroups,
      possibleGroupsShuffled: shuffle(newPossibleGroups),
      pickedGroup: null,
    })
  }, [pots, groups, currentPotNum])

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
          selectedTeam={selectedTeam}
          pot={hungPot}
          onPick={onTeamBallPick}
        />
        <Announcement
          long={false}
          calculating={isLongCalculating}
          completed={completed}
          selectedTeam={selectedTeam}
          pickedGroup={pickedGroup}
          possibleGroups={possibleGroups}
          numGroups={groups.length}
          reset={onReset}
        />
        <GroupBowl
          display={!completed}
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
