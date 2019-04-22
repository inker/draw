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

import usePopup from 'store/usePopup'

import usePartialState from 'utils/hooks/usePartialState'
import useCollection from 'utils/hooks/useCollection'
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
  const [{
    currentPotNum,
    selectedTeam,
    pickedGroup,
    hungPot,
    possibleGroups,
    possibleGroupsShuffled,
    completed,
  }, setState] = usePartialState(initialState)

  const [, setPopup] = usePopup()
  const [airborneTeams, airborneTeamsActions] = useCollection<Team>()

  const onReset = useCallback(() => {
    setDrawId(uniqueId('draw-'))
    setState(getState(initialPots))
  }, [initialPots])

  const onTeamBallPick = useCallback((i: number) => {
    const currentPot = pots[currentPotNum]
    const newSelectedTeam = currentPot.splice(i, 1)[0]
    const newPossibleGroups = allPossibleGroups(pots, groups, newSelectedTeam, currentPotNum, predicate)
    // const possibleGroups = allPossibleGroups(pots, groups, selectedTeam, currentPotNum)

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

    setState({
      selectedTeam: null,
      pickedGroup: newPickedGroup,
      hungPot: pots[newCurrentPotNum],
      possibleGroups: null,
      possibleGroupsShuffled: null,
      currentPotNum: newCurrentPotNum,
      completed: newCurrentPotNum >= pots.length,
    })
    airborneTeamsActions.add(selectedTeam)
  }, [pots, groups, selectedTeam, currentPotNum])

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
