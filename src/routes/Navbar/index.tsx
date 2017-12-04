import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { mobile } from 'bowser'

import ALink from 'components/ALink'
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

  & > * {
    margin-left: 5px;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }

  @media (max-width: 999px) {
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 32px;
  }
`

interface Props {
  location: any,
  refresh: () => void,
  onSeasonChange: (tournament: string, stage: string, season: number) => void,
}

class Navbar extends PureComponent<Props> {

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
          <DivLink onClick={refresh}>
            Restart
          </DivLink>
        }
        <SelectSeason
          tournament={tournament}
          stage={stage}
          season={season}
          onChange={onSeasonChange}
        />
        <ALink
          href="https://github.com/inker/draw/issues"
          target="_blank"
          rel="noopener"
        >
          Issues
        </ALink>
        {!mobile &&
          <GithubButton />
        }
      </Root>
    )
  }
}

export default Navbar
