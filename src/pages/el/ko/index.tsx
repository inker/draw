import React, { PureComponent } from 'react'
import {
  range,
  shuffle,
  uniqueId,
} from 'lodash'

import Team from 'model/team/KnockoutTeam'
import getPossiblePairings from 'engine/possible-pairings'

import animateContentTransfer from 'utils/animateContentTransfer'

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
  drawId: string,
  initialPots: Team[][],
  pots: Team[][],
  matchups: [Team, Team][],
  airborneTeams: Team[],
  currentMatchupNum: number,
  currentPotNum: number,
  possiblePairings: number[] | null,
  completed: boolean,
  error: string | null,
}

export default class ELKO extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = this.getNewState()
  }

  private onReset = () => {
    this.setState(this.getNewState())
  }

  private getNewState(): State {
    const initialPots = this.props.pots
    const currentPotNum = 1
    const currentMatchupNum = 0
    const pots = initialPots.map(pot => shuffle(pot))
    return {
      drawId: uniqueId('draw-'),
      initialPots,
      pots,
      matchups: range(16).map(i => [] as any as [Team, Team]),
      airborneTeams: [],
      currentMatchupNum,
      currentPotNum,
      possiblePairings: null,
      completed: false,
      error: null,
    }
  }

  private onBallPick = (i: number) => {
    const { state } = this
    const {
      initialPots,
      matchups,
      pots,
      currentPotNum,
      currentMatchupNum,
      airborneTeams,
    } = state

    const currentPot = pots[currentPotNum]
    const index = state.possiblePairings ? state.possiblePairings[i] : i
    const selectedTeam = currentPot.splice(index, 1)[0]

    matchups[currentMatchupNum].push(selectedTeam)

    const possiblePairings = currentPotNum === 1
      ? getPossiblePairings(pots, matchups, currentMatchupNum)
      : null

    const newCurrentMatchNum = currentMatchupNum - currentPotNum + 1
    airborneTeams.push(selectedTeam)
    const animation = this.animateCell(selectedTeam)

    this.setState({
      currentPotNum: 1 - currentPotNum,
      currentMatchupNum: newCurrentMatchNum,
      possiblePairings,
      completed: newCurrentMatchNum >= initialPots[0].length,
    }, async () => {
      setTimeout(this.autoPickIfOneBall, 250)
      await animation
      this.setState({
        airborneTeams: this.state.airborneTeams.filter(team => team !== selectedTeam),
      })
    })
  }

  private autoPickIfOneBall = () => {
    const {
      possiblePairings,
      currentPotNum,
      pots,
    } = this.state
    if (possiblePairings && possiblePairings.length === 1 || currentPotNum === 1 && pots[1].length === 1) {
      this.onBallPick(0)
    }
  }

  private animateCell(selectedTeam: Team) {
    const { currentPotNum, currentMatchupNum } = this.state
    const fromCell = document.querySelector(`[data-cellid='${selectedTeam.id}']`)
    const foo = currentPotNum === 0 ? 'gw' : 'ru'
    const toCellSelector = `[data-cellid='${currentMatchupNum}${foo}']`
    const toCell = document.querySelector(toCellSelector)
    if (fromCell instanceof HTMLElement && toCell instanceof HTMLElement) {
      return animateContentTransfer(fromCell, toCell, 350)
    }
  }

  render() {
    const {
      initialPots,
      pots,
      matchups,
      currentPotNum,
      currentMatchupNum,
      airborneTeams,
      possiblePairings,
      completed,
    } = this.state

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
            onPick={this.onBallPick}
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
              reset={this.onReset}
            />
          }
          {possiblePairings &&
            <TeamBowl
              forceNoSelect={currentPotNum === 1}
              display={!completed}
              selectedTeam={null}
              pot={pots[0].filter((team, i) => possiblePairings.includes(i))}
              onPick={this.onBallPick}
            />
          }
        </BowlsContainer>
      </Root>
    )
  }
}
