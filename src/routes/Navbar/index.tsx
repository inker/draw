import React, { memo } from 'react'
import styled from 'styled-components'

import Tournament from 'model/Tournament'
import Stage from 'model/Stage'

import StyledLink from 'ui/StyledLink'
import DivLink from 'ui/DivLink'
import { isHandheld } from 'utils/browser'

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
    justify-content: center;
    margin-top: 5px;
    font-family: 'Roboto Condensed', RobotoCondensed, RobotoCondensed-Regular, Roboto, sans-serif;
    font-size: 10px;
  }
`

interface Props {
  season: number,
  tournament: Tournament,
  stage: Stage,
  refresh: () => void,
  onSeasonChange: (tournament: Tournament, stage: Stage, season: number) => void,
}

const Navbar = ({
  season,
  tournament,
  stage,
  refresh,
  onSeasonChange,
}: Props) => (
  <Root>
    {location && (
      <DivLink onClick={refresh}>
        Restart
      </DivLink>
    )}
    <SelectSeason
      tournament={tournament}
      stage={stage}
      season={season}
      onChange={onSeasonChange}
    />
    {!isHandheld && (
      <>
        <StyledLink
          href="https://github.com/inker/draw/issues"
          target="_blank"
          rel="noopener"
        >
        Issues
        </StyledLink>
        <GithubButton />
      </>
    )}
  </Root>
)

export default memo(Navbar)
