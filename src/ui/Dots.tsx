import React, {
  useState,
  useEffect,
  memo,
} from 'react'

import styled from 'styled-components'

const InvisibleSpan = styled.span`
  opacity: 0;
`

interface Props {
  num: number,
  interval: number,
}

const Dots = ({
  num,
  interval,
}: Props) => {
  const [numVisible, setNumVisible] = useState(num)

  useEffect(() => {
    let timer: number
    const cb = () => {
      timer = setTimeout(() => {
        setNumVisible(state => (state + 1) % (num + 1))
        cb()
      }, interval)
    }
    cb()
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <span>
        {'.'.repeat(numVisible)}
      </span>
      <InvisibleSpan>
        {'.'.repeat(num - numVisible)}
      </InvisibleSpan>
    </>
  )
}

export default memo(Dots)
