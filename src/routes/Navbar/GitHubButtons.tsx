import React, {
  useContext,
  memo,
} from 'react'
import styled from 'styled-components'
import GitHubButton from 'react-github-btn'

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;

  & > * {
    margin-left: 5px;
  }
`

const GitHubButtons = () => (
  <Root>
    <GitHubButton
      href="https://github.com/inker/draw/issues"
      data-icon="octicon-issue-opened"
      data-show-count
      aria-label="Issues on GitHub"
    >
      Issues
    </GitHubButton>
    <GitHubButton
      href="https://github.com/inker/draw"
      data-icon="octicon-star"
      data-show-count
      aria-label="Star on GitHub"
    >
      Star
    </GitHubButton>
  </Root>
)

export default memo(GitHubButtons)
