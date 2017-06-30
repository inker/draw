import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
    href="https://github.com/inker/cl-draw"
    data-icon="octicon-star"
    data-count-href="/inker/cl-draw/stargazers"
    data-count-api="/repos/inker/cl-draw#stargazers_count"
    data-count-aria-label="# stargazers on GitHub"
    aria-label="Star inker/cl-draw on GitHub"
  >
    Star me on GitHub
  </StyledAnchor>
)

const chooseOther = () => {
  const { pathname } = location
  return pathname === '/cl/last16' ? '/cl/gs' : pathname === '/cl/gs' ? '/cl/last16' : '/'
}

const Links = (props) => (
  <Root>
    <StyledLink to="/" onClick={props.refresh} >Restart</StyledLink> |
    {/*<Link to="/">Change mode</Link> |*/}
    <GithubButton />
  </Root>
)

export default Links
