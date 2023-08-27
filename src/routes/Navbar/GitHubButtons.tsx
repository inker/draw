import {
  memo,
  useContext,
} from 'react'
import styled, { ThemeContext } from 'styled-components'
import GitHubButton from 'react-github-btn'

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;

  > * {
    margin-left: 5px;
  }
`

function GitHubButtons() {
  const themeContext = useContext(ThemeContext)
  const { isDarkMode } = themeContext ?? {}

  return (
    <Root>
      <GitHubButton
        href="https://github.com/inker/draw/issues"
        data-icon="octicon-issue-opened"
        data-show-count
        aria-label="Issues on GitHub"
        data-color-scheme={isDarkMode ? 'dark' : 'light'}
      >
        Issues
      </GitHubButton>
      <GitHubButton
        href="https://github.com/inker/draw"
        data-icon="octicon-star"
        data-show-count
        aria-label="Star on GitHub"
        data-color-scheme={isDarkMode ? 'dark' : 'light'}
      >
        Star
      </GitHubButton>
    </Root>
  )
}

export default memo(GitHubButtons)
