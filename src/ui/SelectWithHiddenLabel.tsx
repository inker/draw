import {
  type DetailedHTMLProps,
  type SelectHTMLAttributes,
  memo,
  useId,
} from 'react'
import styled, { css } from 'styled-components'

const Root = styled.div`
  display: inline;
  margin-right: 3px;
  margin-left: 3px;
`

const HiddenLabel = styled.label`
  display: none;
`

const Select = styled.select`
  border-radius: 3px;
  border: ${props => props.theme.border};
  background-color: ${props => props.theme.isDarkMode ? '#246' : 'white'};
  color: ${props => props.theme.isDarkMode ? 'white' : ''};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    ${props => props.theme.isDarkMode
    ? css`
      background-color: #468;
    `
    : css`
      border-color: black;
    `}
  }
`

type SelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

interface Props extends SelectProps {
  label: string,
}

function SelectWithHiddenLabel({
  label,
  children,
  ...props
}: Props) {
  const id = useId()

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
