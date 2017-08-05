import * as React from 'react'
import styled from 'styled-components'
import { mobile } from 'bowser'

import DivLink from 'components/DivLink'
import getCurrentSeason from 'utils/getCurrentSeason'
import SelectSeason from './SelectSeason'
import GithubButton from './GithubButton'

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;

  @media (max-width: 999px) {
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 32px;
  }
`

const DivLinkWithMargin = styled(DivLink)`
  margin-left: 10px;
  margin-right: 10px;
`

interface Props {
  location: any,
  refresh: () => void,
  onSeasonChange: (tournament: string, stage: string, season: number) => void,
}

class TopPanel extends React.PureComponent<Props> {

  render() {
    const {
      location,
      refresh,
      onSeasonChange,
    } = this.props
    const [, tournament, stage] = location.pathname.split('/')
    const season = getCurrentSeason(location)
    return (
      <Root>
        {location &&
          <DivLinkWithMargin onClick={refresh}>
            Restart
          </DivLinkWithMargin>
        }
        <SelectSeason
          tournament={tournament}
          stage={stage}
          season={season}
          onChange={onSeasonChange}
        />
        {/*<Link to="/">Change mode</Link> |*/}
        {!mobile &&
          <GithubButton />
        }
      </Root>
    )
  }
}

export default TopPanel
