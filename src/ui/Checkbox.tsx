import React, {
  useCallback,
  memo,
  FC,
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react'
import styled from 'styled-components'

const Root = styled.label`
  display: flex;
  align-items: center;
  margin-left: 3px;
  margin-right: 3px;
`

const ChildrenWrapper = styled.div`
  margin-left: 0.5rem;
  user-select: none;
`

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props extends Omit<InputProps, 'onChange'> {
  onChange: (value: boolean) => void,
}

const SelectWithHiddenLabel: FC<Props> = ({
  children,
  onChange,
  ...props
}: Props) => {
  const rawOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }, [onChange])

  return (
    <Root>
      <input
        type="checkbox"
        onChange={rawOnChange}
        {...props}
      />
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
    </Root>
  )
}

export default memo(SelectWithHiddenLabel)
