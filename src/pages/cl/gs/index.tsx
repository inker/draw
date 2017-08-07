import * as React from 'react'
import { shuffle } from 'lodash'

import { GSTeam as Team } from 'model/team'
import { allPossibleGroups } from 'model/possible-groups'

import animateContentTransfer from 'utils/animateContentTransfer'
import getGroupLetter from 'utils/getGroupLetter'

import PotsContainer from 'components/PotsContainer'
// import AirborneContainer from 'components/AirborneContainer'
import GroupsContainer from 'components/GroupsContainer'
import TablesContainer from 'components/TablesContainer'
import BowlsContainer from 'components/BowlsContainer'
import TeamBowl from 'components/bowls/TeamBowl'
import GroupBowl from 'components/bowls/GroupBowl'
import Announcement from 'components/Announcement'

import Root from 'pages/Root'

interface Props {
  pots: Team[][],
}

interface State {
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

export default class GS extends React.PureComponent<Props, State> {

  componentDidMount() {
    this.reset()
  }

  private reset = () => {
    const initialPots = this.props.pots
    const currentPotNum = 0
    const pots = initialPots.map(pot => shuffle(pot))
    const currentPot = pots[currentPotNum]
    this.setState({
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
    })
  }

  private onTeamBallPick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const ball = ev.target as HTMLDivElement
    const {
      groups,
      pots,
      currentPotNum,
    } = this.state
    const currentPot = pots[currentPotNum]
    const hungPot = currentPot.slice()
    const i = currentPot.findIndex(team => team.id === ball.dataset.teamid)
    const selectedTeam = currentPot.splice(i, 1)[0]
    const possibleGroups = allPossibleGroups(pots, groups, selectedTeam, currentPotNum)
    this.setState({
      hungPot,
      selectedTeam,
      possibleGroups,
      possibleGroupsShuffled: shuffle(possibleGroups),
      pickedGroup: null,
    })
  }

  private onGroupBallPicked = (ev: React.MouseEvent<HTMLDivElement>) => {
    const ball = ev.target as HTMLDivElement
    const pickedGroup = +(ball.dataset.group || 0)
    const {
      groups,
      airborneTeams,
      selectedTeam,
      pots,
      currentPotNum,
    } = this.state

    if (!selectedTeam) {
      this.setState({
        error: 'shit',
      })
      return
    }

    groups[pickedGroup].push(selectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1
    airborneTeams.push(selectedTeam)
    const animation = this.animateCell(pickedGroup)

    this.setState({
      selectedTeam: null,
      pickedGroup,
      hungPot: pots[newCurrentPotNum],
      possibleGroups: null,
      possibleGroupsShuffled: null,
      currentPotNum: newCurrentPotNum,
      completed: newCurrentPotNum >= pots.length,
      airborneTeams,
    }, async () => {
      const newAirborneTeams = this.state.airborneTeams.filter(team => team !== selectedTeam)
      await animation
      this.setState({
        airborneTeams: newAirborneTeams,
      })
    })
  }

  private animateCell(pickedGroup: number) {
    const { selectedTeam, currentPotNum } = this.state
    if (!selectedTeam) {
      return
    }
    const fromCell = document.querySelector(`[data-cellid='${selectedTeam.id}']`)
    const toCellSelector = `[data-cellid='${getGroupLetter(pickedGroup)}${currentPotNum}']`
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
      groups,
      maxTeamsInGroup,
      currentPotNum,
      hungPot,
      airborneTeams,
      selectedTeam,
      pickedGroup,
      possibleGroups,
      possibleGroupsShuffled,
      completed,
    } = this.state

    return (
      <Root>
        <TablesContainer>
          <PotsContainer
            selectedTeam={selectedTeam}
            initialPots={initialPots}
            pots={pots}
            currentPotNum={currentPotNum}
          />
          <GroupsContainer
            maxTeams={maxTeamsInGroup}
            selectedTeam={selectedTeam}
            currentPotNum={currentPotNum}
            groups={groups}
            possibleGroups={possibleGroups}
            airborneTeams={airborneTeams}
          />
        </TablesContainer>
        <BowlsContainer>
          <TeamBowl
            completed={completed}
            selectedTeam={selectedTeam}
            pot={hungPot}
            onPick={this.onTeamBallPick}
          />
          <Announcement
            long={false}
            completed={completed}
            selectedTeam={selectedTeam}
            pickedGroup={pickedGroup}
            possibleGroups={possibleGroups}
            numGroups={groups.length}
            reset={this.reset}
          />
          <GroupBowl
            completed={completed}
            possibleGroups={possibleGroupsShuffled}
            onPick={this.onGroupBallPicked}
          />
        </BowlsContainer>
      </Root>
    )
  }
}
