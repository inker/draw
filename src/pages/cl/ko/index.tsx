import React, {
  useCallback,
  useMemo,
  useEffect,
  memo,
} from 'react'

import {
  range,
  shuffle,
  uniqueId,
} from 'lodash'

import Team from 'model/team/KnockoutTeam'
import getPossiblePairings from 'engine/possible-pairings'

import usePartialState from 'utils/hooks/usePartialState'

import MovingDiv from 'ui/MovingDiv'
import PotsContainer from 'ui/PotsContainer'
// import AirborneContainer from 'ui/AirborneContainer'
import MatchupsContainer from 'ui/MatchupsContainer'
import TablesContainer from 'ui/TablesContainer'
import BowlsContainer from 'ui/BowlsContainer'
import TeamBowl from 'ui/bowls/TeamBowl'
import Separator from 'ui/Separator'
import Announcement from 'ui/Announcement'

import Root from 'pages/Root'
import setAirborneTeamsReducer, {
  types as airBorneTeamsTypes,
} from 'pages/useAirborneTeamsReducer'

interface Props {
  pots: Team[][],
}

interface State {
  drawId: string,
  pots: Team[][],
  matchups: [Team, Team][],
  currentMatchupNum: number,
  currentPotNum: number,
  possiblePairings: number[] | null,
  completed: boolean,
  error: string | null,
}

function getState(initialPots: Team[][]): State {
  const currentPotNum = 1
  const currentMatchupNum = 0
  const pots = initialPots.map(pot => shuffle(pot))
  return {
    drawId: uniqueId('draw-'),
    pots,
    matchups: range(8).map(i => [] as any as [Team, Team]),
    currentMatchupNum,
    currentPotNum,
    possiblePairings: null,
    completed: false,
    error: null,
  }
}

const CLKO = ({
  pots: initialPots,
}: Props) => {
  const initialState = useMemo(() => getState(initialPots), [initialPots])
  const [state, setState] = usePartialState(initialState)
  const [airborneTeams, dispatchAirborne] = setAirborneTeamsReducer()

  useEffect(() => {
    setTimeout(autoPickIfOneBall, 250)
  }, [state])

  const onReset = useCallback(() => {
    setState(initialState)
  }, [initialPots])

  const onBallPick = useCallback((i: number) => {
    const {
      matchups,
      pots,
      currentPotNum,
      currentMatchupNum,
    } = state

    const currentPot = pots[currentPotNum]
    const index = state.possiblePairings ? state.possiblePairings[i] : i
    const selectedTeam = currentPot.splice(index, 1)[0]

    matchups[currentMatchupNum].push(selectedTeam)

    const possiblePairings = currentPotNum === 1
      ? getPossiblePairings(pots, matchups, currentMatchupNum)
      : null

    const newCurrentMatchNum = currentMatchupNum - currentPotNum + 1

    setState({
      currentPotNum: 1 - currentPotNum,
      currentMatchupNum: newCurrentMatchNum,
      possiblePairings,
      completed: newCurrentMatchNum >= initialPots[0].length,
    })
    dispatchAirborne({
      type: airBorneTeamsTypes.add,
      payload: selectedTeam,
    })
  }, [state, airborneTeams])

  const autoPickIfOneBall = useCallback(() => {
    const {
      possiblePairings,
      currentPotNum,
      pots,
    } = state
    if (possiblePairings && possiblePairings.length === 1 || currentPotNum === 1 && pots[1].length === 1) {
      onBallPick(0)
    }
  }, [state, onBallPick])

  const onAnimationEnd = useCallback((teamData: Team) => {
    dispatchAirborne({
      type: airBorneTeamsTypes.remove,
      payload: teamData,
    })
  }, [state])

  const selectedTeams = state.possiblePairings ? state.possiblePairings.map(i => state.pots[0][i]) : []

  return (
    <Root>
      <TablesContainer>
        <PotsContainer
          selectedTeams={selectedTeams}
          initialPots={initialPots}
          pots={state.pots}
          currentPotNum={state.currentPotNum}
        />
        <MatchupsContainer
          currentMatchupNum={state.currentMatchupNum}
          matchups={state.matchups}
          airborneTeams={airborneTeams}
        />
      </TablesContainer>
      <BowlsContainer>
        {!state.completed &&
          <Separator>Runners-up</Separator>
        }
        <TeamBowl
          forceNoSelect={state.currentPotNum === 0}
          completed={state.completed}
          selectedTeam={null}
          pot={state.pots[1]}
          onPick={onBallPick}
        />
        {!state.completed &&
          <Separator>Group Winners</Separator>
        }
        {state.completed &&
          <Announcement
            long={false}
            completed={state.completed}
            selectedTeam={null}
            pickedGroup={null}
            possibleGroups={null}
            numGroups={0}
            reset={onReset}
          />
        }
        {state.possiblePairings &&
          <TeamBowl
            forceNoSelect={state.currentPotNum === 1}
            completed={state.completed}
            selectedTeam={null}
            pot={state.pots[0].filter((team, i) => state.possiblePairings.includes(i))}
            onPick={onBallPick}
          />
        }
      </BowlsContainer>
      {airborneTeams.map((team: Team) => {
        const { matchups } = state
        const matchupNum = matchups.findIndex(m => m.includes(team))
        const pos = matchups[matchupNum].indexOf(team)
        return (
          <MovingDiv
            key={team.id}
            from={`[data-cellid='${team.id}']`}
            to={`[data-cellid='${matchupNum}${pos === 1 ? 'gw' : 'ru'}']`}
            duration={350}
            data={team}
            onAnimationEnd={onAnimationEnd}
          />
        )
      })}
    </Root>
  )
}

export default memo(CLKO)
