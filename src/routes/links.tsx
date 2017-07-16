import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import SelectSeason from './SelectSeason'

const path = location.pathname

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  margin-bottom: 10px;
`

const StyledLink = styled(Link)`
  margin-left: 5px;
  margin-right: 5px;
`

const StyledAnchor = styled.a`
  margin-left: 5px;
  margin-right: 5px;
`

const GithubButton = () => (
  <StyledAnchor
    className="github-button"
    href="https://github.com/inker/draw"
    data-icon="octicon-star"
    data-count-href="/inker/draw/stargazers"
    data-count-api="/repos/inker/draw#stargazers_count"
    data-count-aria-label="# stargazers on GitHub"
    aria-label="Star inker/draw on GitHub"
  >
    Star me on GitHub
  </StyledAnchor>
)

const Links = (props) => (
  <Root>
    <SelectSeason
      start={2003}
      onChange={e => props.onSeasonChange(+e.target.value)}
    />
    <StyledLink
      to={path}
      onClick={props.refresh}
    >
      Restart
    </StyledLink> |
    {/*<Link to="/">Change mode</Link> |*/}
    <GithubButton />
  </Root>
)

export default Links
