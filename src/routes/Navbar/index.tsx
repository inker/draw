import React, { memo } from 'react'
import styled from 'styled-components'

import Tournament from 'model/Tournament'
import Stage from 'model/Stage'

import Checkbox from 'ui/Checkbox'
import Button from 'ui/Button'
import { isHandheld } from 'utils/browser'

import SelectSeason from './SelectSeason'
import GitHubButtons from './GitHubButtons'

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
  isXRay: boolean,
  onSetIsXRay: (value: boolean) => void,
  refresh: () => void,
  onSeasonChange: (tournament: Tournament, stage: Stage, season: number) => void,
}

const Navbar = ({
  season,
  tournament,
  stage,
  refresh,
  isXRay,
  onSetIsXRay,
  onSeasonChange,
}: Props) => (
  <Root>
    <Button onClick={refresh}>
      Restart
    </Button>
    <SelectSeason
      tournament={tournament}
      stage={stage}
      season={season}
      onChange={onSeasonChange}
    />
    <Checkbox
      checked={isXRay}
      onChange={onSetIsXRay}
    >
      X-ray
    </Checkbox>
    {!isHandheld && (
      <GitHubButtons />
    )}
  </Root>
)

export default memo(Navbar)
