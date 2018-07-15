import React, { PureComponent } from 'react'
import styled from 'styled-components'

import getRandomId from 'utils/getRandomId'

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

class SelectWithHiddenLabel extends PureComponent<Props> {
  id = getRandomId('select-')

  render() {
    const {
      label,
      children,
      ...props
    } = this.props

    return (
      <Root>
        <HiddenLabel htmlFor={this.id}>
          {label}
        </HiddenLabel>
        <select
          id={this.id}
          className="needsclick"
          title={label}
          {...props}
        >
          {children}
        </select>
      </Root>
    )
  }
}

export default SelectWithHiddenLabel
