import React, { memo } from 'react'
import styled from 'styled-components'

import Tournament from 'model/Tournament'
import Stage from 'model/Stage'

import useMatchMedia from 'utils/hooks/useMatchMedia'

import Checkbox from 'ui/Checkbox'
import Button from 'ui/Button'
import StyledLink from 'ui/StyledLink'

import SelectSeason from './SelectSeason'
import GitHubButtons from './GitHubButtons'

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  margin-bottom: 10px;
  height: 24px;
  font-size: 14px;

  & > * {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &:not(:last-child) {
      margin-right: 15px;
    }

    & > * {
      margin-left: 5px;

      &:not(:last-child) {
        margin-right: 5px;
      }
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
  isXRay: boolean,
  isFastDraw: boolean,
  onSetIsXRay: (value: boolean) => void,
  enableFastDraw: () => void,
  restartDraw: () => void,
  onSeasonChange: (tournament: Tournament, stage: Stage, season: number) => void,
}

const Navbar = ({
  season,
  tournament,
  stage,
  restartDraw,
  enableFastDraw,
  isXRay,
  isFastDraw,
  onSetIsXRay,
  onSeasonChange,
}: Props) => {
  const isWidth800 = useMatchMedia('(min-width: 800px)')
  const isWidth650 = useMatchMedia('(min-width: 650px)')

  return (
    <Root>
      <div>
        <Button onClick={restartDraw}>
          Restart
        </Button>
        <Button
          disabled={isFastDraw}
          onClick={enableFastDraw}
        >
          Fast draw
        </Button>
        <SelectSeason
          tournament={tournament}
          stage={stage}
          season={season}
          onChange={onSeasonChange}
        />
        <Checkbox
          value={isXRay}
          onChange={onSetIsXRay}
        >
          X-ray
        </Checkbox>
      </div>
      <div>
        {isWidth800 && (
          <GitHubButtons />
        )}
        <small>
          {isWidth650 ? 'Crafted with ♡ by' : '©'}
          {' '}
          <StyledLink
            href="https://github.com/inker"
            target="_blank"
            rel="noopener"
          >
            inker
          </StyledLink>
        </small>
      </div>
    </Root>
  )
}

export default memo(Navbar)
