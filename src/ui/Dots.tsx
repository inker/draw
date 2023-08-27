import {
  memo,
  useEffect,
  useState,
} from 'react'

import styled from 'styled-components'

const InvisibleSpan = styled.span`
  opacity: 0;
`

interface Props {
  initialNum: number,
  maxNum: number,
  interval: number,
}

function Dots({
  initialNum,
  maxNum,
  interval,
}: Props) {
  const [numVisible, setNumVisible] = useState(initialNum)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const cb = () => {
      timer = setTimeout(() => {
        setNumVisible(state => (state + 1) % (maxNum + 1))
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
        {'.'.repeat(maxNum - numVisible)}
      </InvisibleSpan>
    </>
  )
}

export default memo(Dots)
