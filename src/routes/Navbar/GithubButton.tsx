import React, { memo } from 'react'
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
      href="https://github.com/inker/draw"
    >
      <img
        alt="Star"
        src="https://githubbadges.com/star.svg?user=inker&repo=draw&style=flat"
      />
    </a>
  </Wrapper>
)

export default memo(GithubButton)
