import React, {
  useState,
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
import useCollection from 'utils/hooks/useCollection'

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

interface Props {
  pots: Team[][],
}

interface State {
  currentMatchupNum: number,
  currentPotNum: number,
  possiblePairings: number[] | null,
  completed: boolean,
}

function getState(): State {
  const currentPotNum = 1
  const currentMatchupNum = 0
  return {
    currentMatchupNum,
    currentPotNum,
    possiblePairings: null,
    completed: false,
  }
}

const CLKO = ({
  pots: initialPots,
}: Props) => {
  const [drawId, setDrawId] = useState(uniqueId('draw-'))
  const pots = useMemo(() => initialPots.map(pot => shuffle(pot)), [initialPots, drawId])
  const matchups = useMemo(() => range(8).map(i => [] as any as [Team, Team]), [initialPots, drawId])

  const initialState = useMemo(getState, [])
  const [{
    currentMatchupNum,
    currentPotNum,
    possiblePairings,
    completed,
  }, setState] = usePartialState(initialState)

  const [airborneTeams, airborneTeamsActions] = useCollection<Team>()

  useEffect(() => {
    setTimeout(autoPickIfOneBall, 250)
    // @ts-ignore
  }, [autoPickIfOneBall])

  const onReset = useCallback(() => {
    setDrawId(uniqueId('draw-'))
    setState(getState())
  }, [initialPots])

  const onBallPick = useCallback((i: number) => {
    const currentPot = pots[currentPotNum]
    const index = possiblePairings ? possiblePairings[i] : i
    const selectedTeam = currentPot.splice(index, 1)[0]

    matchups[currentMatchupNum].push(selectedTeam)

    const newPossiblePairings = currentPotNum === 1
      ? getPossiblePairings(pots, matchups, currentMatchupNum)
      : null

    const newCurrentMatchNum = currentMatchupNum - currentPotNum + 1

    setState({
      currentPotNum: 1 - currentPotNum,
      currentMatchupNum: newCurrentMatchNum,
      possiblePairings: newPossiblePairings,
      completed: newCurrentMatchNum >= initialPots[0].length,
    })
    airborneTeamsActions.add(selectedTeam)
  }, [pots, matchups, currentPotNum, currentMatchupNum, possiblePairings, airborneTeams])

  const autoPickIfOneBall = useCallback(() => {
    if (possiblePairings && possiblePairings.length === 1 || currentPotNum === 1 && pots[1].length === 1) {
      onBallPick(0)
    }
  }, [pots, possiblePairings, currentPotNum, onBallPick])

  const selectedTeams = possiblePairings ? possiblePairings.map(i => pots[0][i]) : []

  return (
    <Root>
      <TablesContainer>
        <PotsContainer
          selectedTeams={selectedTeams}
          initialPots={initialPots}
          pots={pots}
          currentPotNum={currentPotNum}
        />
        <MatchupsContainer
          currentMatchupNum={currentMatchupNum}
          matchups={matchups}
          airborneTeams={airborneTeams}
        />
      </TablesContainer>
      <BowlsContainer>
        {!completed &&
          <Separator>Runners-up</Separator>
        }
        <TeamBowl
          forceNoSelect={currentPotNum === 0}
          display={!completed}
          selectedTeam={null}
          pot={pots[1]}
          onPick={onBallPick}
        />
        {!completed &&
          <Separator>Group Winners</Separator>
        }
        {completed &&
          <Announcement
            long={false}
            completed={completed}
            selectedTeam={null}
            pickedGroup={null}
            possibleGroups={null}
            numGroups={0}
            reset={onReset}
          />
        }
        {possiblePairings &&
          <TeamBowl
            forceNoSelect={currentPotNum === 1}
            display={!completed}
            selectedTeam={null}
            pot={pots[0].filter((team, i) => possiblePairings.includes(i))}
            onPick={onBallPick}
          />
        }
      </BowlsContainer>
      {airborneTeams.map((team: Team) => {
        const matchupNum = matchups.findIndex(m => m.includes(team))
        const pos = matchups[matchupNum].indexOf(team)
        return (
          <MovingDiv
            key={team.id}
            from={`[data-cellid='${team.id}']`}
            to={`[data-cellid='${matchupNum}${pos === 1 ? 'gw' : 'ru'}']`}
            duration={350}
            data={team}
            onAnimationEnd={airborneTeamsActions.remove}
          />
        )
      })}
    </Root>
  )
}

export default memo(CLKO)
