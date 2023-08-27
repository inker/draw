import {
  memo,
  useCallback,
} from 'react'

import { type Theme } from 'store/useTheme'

import Select from 'ui/SelectWithHiddenLabel'

interface Props {
  value: Theme,
  onChange: (value: Theme) => void,
}

function SelectTheme({
  value,
  onChange,
}: Props) {
  const wrappedOnChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    onChange(newValue as Theme)
  }, [onChange])

  return (
    <div>
      <Select
        label="Theme"
        onChange={wrappedOnChange}
        value={value}
      >
        <option value="light">Light theme</option>
        <option value="dark">Dark theme</option>
        <option value="auto">System theme</option>
      </Select>
    </div>
  )
}

export default memo(SelectTheme)
