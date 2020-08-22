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
} from 'lodash'

import Team from 'model/team/KnockoutTeam'
import getPossiblePairings from 'engine/predicates/uefa/getPossiblePairings'
import getPredicate from 'engine/predicates/uefa/ko'

import useDrawId from 'store/useDrawId'
import useXRay from 'store/useXRay'

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
  season: number,
  pots: readonly (readonly Team[])[],
}

interface State {
  currentMatchupNum: number,
  currentPotNum: number,
  possiblePairings: readonly number[] | null,
}

function getState(): State {
  const currentPotNum = 1
  const currentMatchupNum = 0
  return {
    currentMatchupNum,
    currentPotNum,
    possiblePairings: null,
  }
}

const ELKO = ({
  season,
  pots: initialPots,
}: Props) => {
  const [drawId, setNewDrawId] = useDrawId()
  const pots = useMemo(
    () => initialPots.map(pot => shuffle(pot)) as readonly Team[][],
    [initialPots, drawId],
  )
  const matchups = useMemo(
    () => range(16).map(() => [] as any) as readonly [Team, Team][],
    [initialPots, drawId],
  )
  const predicate = useMemo(() => getPredicate(season), [season])

  const initialState = useMemo(getState, [])
  const [{
    currentMatchupNum,
    currentPotNum,
    possiblePairings,
  }, setState] = useState(initialState)

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  const [isXRay] = useXRay()

  const [airborneTeams, airborneTeamsActions] = useCollection<Team>()

  const onBallPick = useCallback((i: number) => {
    const currentPot = pots[currentPotNum]
    const index = possiblePairings ? possiblePairings[i] : i
    const selectedTeam = currentPot.splice(index, 1)[0]

    matchups[currentMatchupNum].push(selectedTeam)

    const newPossiblePairings = currentPotNum === 1
      ? getPossiblePairings(pots, matchups, predicate)
      : null

    const newCurrentMatchNum = currentMatchupNum - currentPotNum + 1

    setState({
      currentPotNum: 1 - currentPotNum,
      currentMatchupNum: newCurrentMatchNum,
      possiblePairings: newPossiblePairings,
    })
    airborneTeamsActions.add(selectedTeam)
  }, [predicate, pots, matchups, currentPotNum, currentMatchupNum, possiblePairings, airborneTeams])

  const autoPickIfOneBall = () => {
    const isOnlyChoice = possiblePairings?.length === 1
      || currentPotNum === 1 && pots[1].length === 1
    if (isOnlyChoice) {
      onBallPick(0)
    }
  }

  useEffect(() => {
    setTimeout(autoPickIfOneBall, 250)
  }, [currentPotNum])

  const onReset = useCallback(() => {
    setNewDrawId()
    setState(getState())
  }, [initialPots])

  const teamBowlPot = useMemo(
    () => possiblePairings && pots[0].filter((team, i) => possiblePairings.includes(i)),
    [possiblePairings],
  )

  const completed = currentMatchupNum >= initialPots[0].length
  const selectedTeams = possiblePairings ? possiblePairings.map(i => pots[0][i]) : []

  return (
    <Root>
      <TablesContainer>
        <PotsContainer
          selectedTeams={selectedTeams}
          initialPots={initialPots}
          pots={pots}
          currentPotNum={currentPotNum}
          split
        />
        <MatchupsContainer
          matchups={matchups}
          airborneTeams={airborneTeams}
        />
      </TablesContainer>
      <BowlsContainer>
        {!completed && (
          <Separator>Runners-up</Separator>
        )}
        <TeamBowl
          forceNoSelect={currentPotNum === 0}
          display={!completed}
          displayTeams={isXRay}
          selectedTeam={null}
          pot={pots[1]}
          onPick={onBallPick}
        />
        {!completed && (
          <Separator>Group Winners</Separator>
        )}
        {completed && (
          <Announcement
            long={false}
            completed={completed}
            selectedTeam={null}
            pickedGroup={null}
            possibleGroups={null}
            numGroups={0}
            reset={onReset}
          />
        )}
        {teamBowlPot && (
          <TeamBowl
            forceNoSelect={currentPotNum === 1}
            display={!completed}
            displayTeams={isXRay}
            selectedTeam={null}
            pot={teamBowlPot}
            onPick={onBallPick}
          />
        )}
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

export default memo(ELKO)
