import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { random, shuffle, stubArray, without } from 'lodash'

import { type EmptyOrSingleOrPair, type FixedArray } from 'model/types'
import type Team from 'model/team/KnockoutTeam'
import { serializeGsWorkerData } from 'model/WorkerData'

import usePopup from 'store/usePopup'
import useDrawId from 'store/useDrawId'
import useFastDraw from 'store/useFastDraw'
import useXRay from 'store/useXRay'

import useWorkerSendAndReceive from 'utils/hooks/useWorkerSendAndReceive'

import PageRoot from 'ui/PageRoot'
import PotsContainer from 'ui/PotsContainer'
import MatchupsContainer from 'ui/MatchupsContainer'
import TablesContainer from 'ui/TablesContainer'
import BowlsContainer from 'ui/BowlsContainer'
import TeamBowl from 'ui/bowls/TeamBowl'
import Separator from 'ui/Separator'
import Announcement from 'ui/Announcement'

import { type Func } from './worker'

const createWorker = () => new Worker(new URL('./worker', import.meta.url))

interface Props {
  season: number
  pots: FixedArray<readonly Team[], 2>
}

interface State {
  currentMatchupNum: number
  currentPotNum: number
  possiblePairings: readonly number[] | null
  pots: FixedArray<readonly Team[], 2>
  potsToDisplay: readonly [readonly Team[] | null, readonly Team[]]
  matchups: readonly EmptyOrSingleOrPair<Team>[]
}

function getState(initialPots: FixedArray<readonly Team[], 2>): State {
  const currentPotNum = 1
  const currentMatchupNum = 0
  const numMatchups = 8
  const pots = initialPots.map(
    pot => shuffle(pot) as readonly Team[],
  ) as typeof initialPots
  return {
    currentMatchupNum,
    currentPotNum,
    possiblePairings: null,
    pots,
    potsToDisplay: [null, pots[1]],
    matchups: Array.from({ length: numMatchups }, stubArray as () => []),
  }
}

function CLKO({ season, pots: initialPots }: Props) {
  const [drawId, setNewDrawId] = useDrawId()
  const [isFastDraw] = useFastDraw()

  const [
    {
      currentMatchupNum,
      currentPotNum,
      possiblePairings,
      pots,
      potsToDisplay,
      matchups,
    },
    setState,
  ] = useState(() => getState(initialPots))

  useEffect(() => {
    setState(getState(initialPots))
  }, [initialPots, drawId])

  const [, setPopup] = usePopup()
  const [isXRay] = useXRay()

  const getPossiblePairingsResponse = useWorkerSendAndReceive(
    createWorker,
  ) as Func

  const groupsContanerRef = useRef<HTMLElement>(null)

  const selectedTeam = matchups.find(m => m.length === 1)?.at(-1)

  const getPossiblePairings = useCallback(
    async (
      newPots: FixedArray<readonly Team[], 2>,
      newMatchups: readonly EmptyOrSingleOrPair<Team>[],
    ) => {
      const [newGwPot, newRuPot] = newPots
      const initialGwPot = initialPots[0]
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const pickedTeam = newMatchups.find(m => m.length === 1)?.at(-1)!
      const groups = initialGwPot.map(gw => {
        const ru = newMatchups.find(pair => pair[1] === gw)?.[0]
        return ru ? [gw, ru] : [gw]
      })
      try {
        const allPossibleGroups = await getPossiblePairingsResponse(
          serializeGsWorkerData({
            season,
            pots: [[], newRuPot],
            groups,
            selectedTeam: pickedTeam,
          }),
        )
        return allPossibleGroups.map(i => newGwPot.indexOf(groups[i][0]))
      } catch (err) {
        setPopup({
          error: 'Could not determine possible pairings',
        })
        throw err
      }
    },
    [season, initialPots, getPossiblePairingsResponse],
  )

  const handleBallPick = useCallback(
    async (index: number) => {
      const currentPot = potsToDisplay[currentPotNum]!
      const pickedTeam = currentPot[index]

      const newPots = pots.with(
        currentPotNum,
        without(pots[currentPotNum], pickedTeam),
      ) as typeof pots

      const newMatchups = matchups.with(currentMatchupNum, [
        ...(matchups[currentMatchupNum] as [Team]),
        pickedTeam,
      ]) as typeof matchups

      const newPossiblePairings =
        currentPotNum === 1
          ? await getPossiblePairings(newPots, newMatchups)
          : null

      const gwPot = newPossiblePairings
        ? newPots[0].filter((_, i) => newPossiblePairings.includes(i))
        : null
      const newPotsToDisplay = [gwPot, pots[1]] as const

      const newCurrentMatchNum = currentMatchupNum - currentPotNum + 1

      setState(state => ({
        ...state,
        currentPotNum: 1 - currentPotNum,
        currentMatchupNum: newCurrentMatchNum,
        possiblePairings: newPossiblePairings,
        pots: newPots,
        potsToDisplay: newPotsToDisplay,
        matchups: newMatchups,
      }))
    },
    [
      pots,
      potsToDisplay,
      matchups,
      currentPotNum,
      currentMatchupNum,
      getPossiblePairings,
    ],
  )

  const autoPickIfOneBall = () => {
    if (isFastDraw) {
      return
    }
    const isOnlyChoice =
      possiblePairings?.length === 1 ||
      (currentPotNum === 1 && pots[1].length === 1)
    if (isOnlyChoice) {
      handleBallPick(0)
    }
  }

  useEffect(() => {
    setTimeout(autoPickIfOneBall, 250)
  }, [currentPotNum])

  const completed = currentMatchupNum >= initialPots[0].length

  useEffect(() => {
    if (isFastDraw) {
      const teams = potsToDisplay[currentPotNum]!
      const numTeams = teams.length
      if (numTeams > 0) {
        const index = random(numTeams - 1)
        handleBallPick(index)
      }
    }
  }, [isFastDraw, currentPotNum])

  return (
    <PageRoot>
      <TablesContainer>
        <PotsContainer
          selectedTeams={potsToDisplay[0]}
          initialPots={initialPots}
          pots={pots}
          currentPotNum={currentPotNum}
        />
        <MatchupsContainer
          ref={groupsContanerRef}
          matchups={matchups}
        />
      </TablesContainer>
      <BowlsContainer>
        {!isFastDraw && (
          <>
            {!completed && <Separator>Runners-up</Separator>}
            <TeamBowl
              forceNoSelect={currentPotNum === 0}
              display={!completed}
              displayTeams={isXRay}
              selectedTeam={selectedTeam ?? null}
              pot={potsToDisplay[1]}
              onPick={handleBallPick}
            />
            {!completed && <Separator>Group Winners</Separator>}
            {potsToDisplay[0] && (
              <TeamBowl
                forceNoSelect={currentPotNum === 1}
                display={!completed}
                displayTeams={isXRay}
                selectedTeam={null}
                pot={potsToDisplay[0]}
                onPick={handleBallPick}
              />
            )}
          </>
        )}
        {completed && (
          <Announcement
            long={false}
            completed={completed}
            selectedTeam={null}
            pickedGroup={null}
            possibleGroups={null}
            numGroups={0}
            groupsElement={groupsContanerRef}
            reset={setNewDrawId}
          />
        )}
      </BowlsContainer>
    </PageRoot>
  )
}

export default memo(CLKO)
