import useTheme from 'store/useTheme'

import usePrefersDarkMode from './usePrefersDarkMode'

export default () => {
  const [theme] = useTheme()
  const prefersDarkMode = usePrefersDarkMode()
  return theme === 'dark' || (theme === 'auto' && prefersDarkMode)
}
