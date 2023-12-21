export const light = {
  isDarkMode: false,
  border: '#aaa solid 1px',
}

export const dark = {
  isDarkMode: true,
  border: '#222 solid 1px',
}

export type ThemeInterface = typeof dark & typeof light
