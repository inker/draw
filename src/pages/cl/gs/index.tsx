import React, {
  useState,
  useCallback,
  useMemo,
  memo,
} from 'react'

import { allPossibleGroups } from '@draws/engine'

import {
  shuffle,
  uniqueId,
} from 'lodash'

import Team from 'model/team/GSTeam'
import predicate from 'engine/predicates/gs'

import usePartialState from 'utils/hooks/usePartialState'
import useCollectionActions from 'utils/hooks/useCollectionActions'
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
    possibleGroups: null,
    possibleGroupsShuffled: null,
    completed: false,
  }
}

const CLGS = ({
  pots: initialPots,
}: Props) => {
  const [drawId, setDrawId] = useState(uniqueId('draw-'))
  const pots = useMemo(() => initialPots.map(pot => shuffle(pot)), [initialPots, drawId])
  const groups = useMemo(() => initialPots[0].map(team => [] as Team[]), [initialPots, drawId])

  const initialState = useMemo(() => getState(pots), [pots])
  const [state, setState] = usePartialState(initialState)

  const [error, setError] = useState<string | null>(null)
  const [airborneTeams, airborneTeamsActions] = useCollectionActions<Team>()

  const onReset = useCallback(() => {
    setDrawId(uniqueId('draw-'))
    setState(getState(initialPots))
  }, [initialPots])

  const onTeamBallPick = useCallback((i: number) => {
    const {
      currentPotNum,
    } = state

    const currentPot = pots[currentPotNum]
    const hungPot = currentPot.slice()
    const selectedTeam = currentPot.splice(i, 1)[0]
    const possibleGroups = allPossibleGroups(pots, groups, selectedTeam, currentPotNum, predicate)
    // const possibleGroups = allPossibleGroups(pots, groups, selectedTeam, currentPotNum)

    setState({
      hungPot,
      selectedTeam,
      possibleGroups,
      possibleGroupsShuffled: shuffle(possibleGroups),
      pickedGroup: null,
    })
  }, [pots, groups, state.currentPotNum])

  const onGroupBallPick = useCallback((pickedGroup: number) => {
    const {
      selectedTeam,
      currentPotNum,
    } = state

    if (!selectedTeam) {
      setError('No selected team...')
      return
    }

    groups[pickedGroup].push(selectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    setState({
      selectedTeam: null,
      pickedGroup,
      hungPot: pots[newCurrentPotNum],
      possibleGroups: null,
      possibleGroupsShuffled: null,
      currentPotNum: newCurrentPotNum,
      completed: newCurrentPotNum >= pots.length,
    })
    airborneTeamsActions.add(selectedTeam)
  }, [pots, groups, state])

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
          possibleGroups={state.possibleGroups}
          airborneTeams={airborneTeams}
          groupColors={groupColors}
        />
      </TablesContainer>
      <BowlsContainer>
        <TeamBowl
          display={!state.completed}
          selectedTeam={state.selectedTeam}
          pot={state.hungPot}
          onPick={onTeamBallPick}
        />
        <Announcement
          long={false}
          completed={state.completed}
          selectedTeam={state.selectedTeam}
          pickedGroup={state.pickedGroup}
          possibleGroups={state.possibleGroups}
          numGroups={groups.length}
          reset={onReset}
        />
        <GroupBowl
          display={!state.completed}
          possibleGroups={state.possibleGroupsShuffled}
          onPick={onGroupBallPick}
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

export default memo(CLGS)
