import React from 'react'
import styled from 'styled-components'

const PREFIX = `label-${Math.random().toString(36).slice(2)}`

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

const SelectWithHiddenLabel: React.SFC<Props> = ({
  label,
  children,
  ...props,
}) => {
  const id = `${PREFIX}-${label}`
  return (
    <Root>
      <HiddenLabel htmlFor={id}>
        {label}
      </HiddenLabel>
      <select
        id={id}
        className="needsclick"
        title={label}
        {...props}
      >
        {children}
      </select>
    </Root>
  )
}

export default SelectWithHiddenLabel
