import React, {
  useCallback,
  memo,
} from 'react'
import styled from 'styled-components'

import Tournament from 'model/Tournament'
import Stage from 'model/Stage'

import useMedia from 'utils/hooks/useMedia'
import useDrawId from 'store/useDrawId'
import useXRay from 'store/useXRay'
import useFastDraw from 'store/useFastDraw'

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
  onSeasonChange: (tournament: Tournament, stage: Stage, season: number) => void,
}

const Navbar = ({
  season,
  tournament,
  stage,
  onSeasonChange,
}: Props) => {
  const [isXRay, setIsXRay] = useXRay()
  const [, refreshDrawId] = useDrawId()
  const [isFastDraw, setIsFastDraw] = useFastDraw()

  const isWidth800 = useMedia('(min-width: 800px)')
  const isWidth650 = useMedia('(min-width: 650px)')

  const disableFastDrawAndRestart = useCallback(() => {
    setIsFastDraw(false)
    refreshDrawId()
  }, [])

  const enableFastDraw = useCallback(() => {
    setIsFastDraw(true)
  }, [])

  return (
    <Root>
      <div>
        <Button onClick={disableFastDrawAndRestart}>
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
          onChange={setIsXRay}
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
