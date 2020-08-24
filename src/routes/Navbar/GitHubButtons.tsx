import React, { memo } from 'react'
import GitHubButton from 'react-github-btn'

const GitHubButtons = () => (
  <>
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
  </>
)

export default memo(GitHubButtons)
