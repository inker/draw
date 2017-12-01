import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 5px;
  width: 80px;
`

const GithubButton = () => (
  <Wrapper>
    <a
      target="_blank"
      rel="noopener"
      className="github-button"
      href="https://github.com/inker/draw"
      data-icon="octicon-star"
      data-show-count="true"
      data-count-href="/inker/draw/stargazers"
      data-count-aria-label="# stargazers on GitHub"
      aria-label="Star inker/draw on GitHub"
    >
      Star
    </a>
  </Wrapper>
)

export default GithubButton
