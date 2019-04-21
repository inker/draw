import React, { memo } from 'react'
import styled from 'styled-components'

import useRandom from 'utils/hooks/useRandom'

const Root = styled.div`
  display: inline;
  margin-left: 3px;
  margin-right: 3px;
`

const HiddenLabel = styled.label`
  display: none;
`

interface Props {
  label: string,
  [property: string]: any,
}

const SelectWithHiddenLabel: React.FC<Props> = ({
  label,
  children,
  ...props
}) => {
  const [id] = useRandom('select-')

  return (
    <Root>
      <HiddenLabel htmlFor={id}>
        {label}
      </HiddenLabel>
      <select
        id={id}
        title={label}
        {...props}
      >
        {children}
      </select>
    </Root>
  )
}

export default memo(SelectWithHiddenLabel)
