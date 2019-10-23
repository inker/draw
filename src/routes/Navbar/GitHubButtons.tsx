// eslint-disable-next-line import/order
import React, { memo } from 'react'
// eslint-disable-next-line import/order
import GitHubButton from 'react-github-btn'

const GitHubButtons = () => (
  <>
    <GitHubButton
      href="https://github.com/inker/draw/issues"
      data-icon="octicon-issue-opened"
      // @ts-ignore
      data-show-count="true"
      aria-label="Issues on GitHub"
    >
      Issues
    </GitHubButton>
    <GitHubButton
      href="https://github.com/inker/draw"
      data-icon="octicon-star"
      // @ts-ignore
      data-show-count="true"
      aria-label="Star on GitHub"
    >
      Star
    </GitHubButton>
  </>
)

export default memo(GitHubButtons)
