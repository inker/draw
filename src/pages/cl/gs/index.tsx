import React, {
  useCallback,
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
  drawId: string,
  initialPots: Team[][],
  pots: Team[][],
  groups: Team[][],
  maxTeamsInGroup: number,
  airborneTeams: Team[],
  currentPotNum: number,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  hungPot: Team[],
  possibleGroups: number[] | null,
  possibleGroupsShuffled: number[] | null,
  completed: boolean,
  error: string | null,
}

function getState(initialPots: Team[][]): State {
  const currentPotNum = 0
  const pots = initialPots.map(pot => shuffle(pot))
  const currentPot = pots[currentPotNum]
  return {
    drawId: uniqueId('draw-'),
    initialPots,
    pots,
    groups: currentPot.map(team => []),
    maxTeamsInGroup: pots.length,
    airborneTeams: [],
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: currentPot,
    possibleGroups: null,
    possibleGroupsShuffled: null,
    completed: false,
    error: null,
  }
}

const CLGS = ({
  pots: initialPots,
}: Props) => {
  const [state, setState] = usePartialState(getState(initialPots))

  const onReset = useCallback(() => {
    setState(getState(initialPots))
  }, [initialPots])

  const onTeamBallPick = useCallback((i: number) => {
    const {
      groups,
      pots,
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
  }, [state])

  const onGroupBallPick = useCallback((pickedGroup: number) => {
    const {
      groups,
      airborneTeams,
      selectedTeam,
      pots,
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

    setState({
      selectedTeam: null,
      pickedGroup,
      hungPot: pots[newCurrentPotNum],
      possibleGroups: null,
      possibleGroupsShuffled: null,
      currentPotNum: newCurrentPotNum,
      completed: newCurrentPotNum >= pots.length,
      airborneTeams: [...airborneTeams, selectedTeam],
    })
  }, [state])

  const onAnimationEnd = useCallback((teamData: Team) => {
    const newAirborneTeams = state.airborneTeams.filter(t => t !== teamData)
    setState({
      airborneTeams: newAirborneTeams,
    })
  }, [state])

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
          maxTeams={state.maxTeamsInGroup}
          currentPotNum={state.currentPotNum}
          groups={state.groups}
          possibleGroups={state.possibleGroups}
          airborneTeams={state.airborneTeams}
          groupColors={groupColors}
        />
      </TablesContainer>
      <BowlsContainer>
        <TeamBowl
          completed={state.completed}
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
          numGroups={state.groups.length}
          reset={onReset}
        />
        <GroupBowl
          completed={state.completed}
          possibleGroups={state.possibleGroupsShuffled}
          onPick={onGroupBallPick}
        />
      </BowlsContainer>
      {state.airborneTeams.map(team => {
        const { groups } = state
        const pg = groups.findIndex(g => g.includes(team))
        const pos = groups[pg].indexOf(team)
        return (
          <MovingDiv
            key={team.id}
            from={`[data-cellid='${team.id}']`}
            to={`[data-cellid='${getGroupLetter(pg)}${pos}']`}
            duration={350}
            data={team}
            onAnimationEnd={onAnimationEnd}
          />
        )
      })}
    </Root>
  )
}

export default memo(CLGS)
