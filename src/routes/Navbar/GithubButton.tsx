import React, { memo } from 'react'
import styled from 'styled-components'

import proxify from 'utils/proxify'

const BUTTON_IMAGE_URL = 'http://githubbadges.com/star.svg?user=inker&repo=draw&style=flat'

const searchParams = new URLSearchParams({
  url: BUTTON_IMAGE_URL,
})

const buttonImgUrl = proxify(searchParams)

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
        src={buttonImgUrl}
      />
    </a>
  </Wrapper>
)

export default memo(GithubButton)
