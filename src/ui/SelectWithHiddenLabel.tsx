import React, {
  memo,
  FC,
  DetailedHTMLProps,
  SelectHTMLAttributes,
} from 'react'
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

const Select = styled.select`
  border-radius: 3px;
  border: ${props => props.theme.border};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    border-color: black;
  }
`

type SelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

interface Props extends SelectProps {
  label: string,
}

const SelectWithHiddenLabel: FC<Props> = ({
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
      <Select
        id={id}
        title={label}
        {...props as any}
      >
        {children}
      </Select>
    </Root>
  )
}

export default memo(SelectWithHiddenLabel)
