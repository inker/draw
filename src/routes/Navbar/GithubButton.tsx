import Image from 'react-image'

import React, { memo } from 'react'
import styled from 'styled-components'

import proxifyAllPossible from './proxifyAllPossible'

const BUTTON_IMAGE_URL = 'http://githubbadges.com/star.svg?user=inker&repo=draw&style=flat'

const proxifiedImageUrls = proxifyAllPossible(BUTTON_IMAGE_URL)

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
      rel="noopener noreferrer"
      href="https://github.com/inker/draw"
    >
      <Image
        alt="Star"
        src={proxifiedImageUrls}
      />
    </a>
  </Wrapper>
)

export default memo(GithubButton)
