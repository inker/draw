import * as React from 'react'
import { shuffle, uniqueId } from 'lodash'

import Team from 'model/team/KnockoutTeam'
import getPossiblePairings from 'model/possible-pairings'

import animateContentTransfer from 'utils/animateContentTransfer'

import PotsContainer from 'components/PotsContainer'
// import AirborneContainer from 'components/AirborneContainer'
import MatchupsContainer from 'components/MatchupsContainer'
import TablesContainer from 'components/TablesContainer'
import BowlsContainer from 'components/BowlsContainer'
import TeamBowl from 'components/bowls/TeamBowl'
// import Announcement from 'components/Announcement'

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
  selectedTeam: Team | null,
  hungPot: Team[],
  possiblePairings: number[] | null,
  possiblePairingsShuffled: number[] | null,
  completed: boolean,
  error: string | null,
}

export default class RoundOf16 extends React.PureComponent<Props, State> {

  componentDidMount() {
    this.reset()
  }

  private reset = () => {
    const initialPots = this.props.pots
    const currentPotNum = 1
    const currentMatchupNum = 0
    const pots = initialPots.map(pot => shuffle(pot))
    const currentPot = pots[currentPotNum]
    this.setState({
      drawId: `draw-${uniqueId()}`,
      initialPots,
      pots,
      matchups: [],
      airborneTeams: [],
      currentMatchupNum,
      currentPotNum,
      selectedTeam: null,
      hungPot: currentPot,
      possiblePairings: null,
      possiblePairingsShuffed: null,
      completed: false,
      error: null,
    })
  }

  private onBallPick = (i: number, pot: Team[]) => {
    const { state } = this
    const {
      matchups,
      pots,
      currentPotNum,
      currentMatchupNum,
      airborneTeams,
    } = state

    const currentPot = pots[currentPotNum]
    const hungPot = currentPot.slice()
    const index = state.possiblePairings ? state.possiblePairings[i] : i
    const selectedTeam = currentPot.splice(index, 1)[0]

    if (currentPotNum === 0) {
      matchups[currentMatchupNum].push(selectedTeam)
    } else {
      matchups.push([selectedTeam] as any)
    }
    matchups[currentMatchupNum].push()
    const possiblePairings = currentPotNum === 1
      ? getPossiblePairings(pots, matchups, currentMatchupNum)
      : null

    airborneTeams.push(selectedTeam)
    const animation = this.animateCell(selectedTeam, currentPotNum, currentMatchupNum)

    this.setState({
      hungPot,
      selectedTeam,
      currentPotNum: 1 - currentPotNum,
      currentMatchupNum: currentMatchupNum - currentPotNum + 1,
      possiblePairings,
      possiblePairingsShuffled: possiblePairings && shuffle(possiblePairings),
    }, async () => {
      const newAirborneTeams = this.state.airborneTeams.filter(team => team !== selectedTeam)
      await animation
      this.setState({
        airborneTeams: newAirborneTeams,
      })
    })
  }

  private animateCell(selectedTeam: Team, currentPotNum: number, currentMatchupNum: number) {
    const fromCell = document.querySelector(`[data-cellid='${selectedTeam.id}']`)
    const foo = currentPotNum === 0 ? 'gw' : 'ru'
    const toCellSelector = `[data-cellid='${currentMatchupNum}${foo}']`
    const toCell = document.querySelector(toCellSelector)
    if (fromCell instanceof HTMLElement && toCell instanceof HTMLElement) {
      return animateContentTransfer(fromCell, toCell, 350)
    }
  }

  render() {
    if (!this.state) {
      return null
    }
    const {
      initialPots,
      pots,
      matchups,
      currentPotNum,
      currentMatchupNum,
      airborneTeams,
      selectedTeam,
      hungPot,
      possiblePairings,
      possiblePairingsShuffled,
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
            forceAllActive
          />
          <MatchupsContainer
            selectedTeam={selectedTeam}
            currentPotNum={currentPotNum}
            currentMatchupNum={currentMatchupNum}
            matchups={matchups}
            airborneTeams={airborneTeams}
          />
        </TablesContainer>
        <BowlsContainer>
          <TeamBowl
            forceNoSelect={currentPotNum === 0}
            completed={completed}
            selectedTeam={null}
            pot={pots[1]}
            onPick={this.onBallPick}
          />
          <div>divisor</div>
          {/* <Announcement
            long={false}
            completed={completed}
            selectedTeam={selectedTeam}
            pickedGroup={pickedGroup}
            possibleGroups={possibleGroups}
            numGroups={groups.length}
            reset={this.reset}
          /> */}
          {possiblePairings &&
            <TeamBowl
              forceNoSelect={currentPotNum === 1}
              completed={completed}
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
