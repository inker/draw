import {
  type ChangeEvent,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  memo,
  useCallback,
} from 'react'
import styled, { css } from 'styled-components'

const Root = styled.label`
  display: flex;
  align-items: center;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
`

const Box = styled.input.attrs({
  type: 'checkbox',
})`
  cursor: pointer;
  ${props => props.theme.isDarkMode && css`
    border: ${props.theme.border};
    background-color: #246;
  `}
`

const ChildrenWrapper = styled.div`
  margin-left: 0.5rem;
  user-select: none;
`

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props extends Omit<InputProps, 'value' | 'onChange'> {
  value: boolean,
  onChange: (value: boolean) => void,
}

function SelectWithHiddenLabel({
  children,
  value,
  onChange,
  ...props
}: Props) {
  const rawOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }, [onChange])

  return (
    <Root>
      <Box
        checked={value}
        onChange={rawOnChange}
        {...props as any}
      />
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
    </Root>
  )
}

export default memo(SelectWithHiddenLabel)
