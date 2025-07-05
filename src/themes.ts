export const light = {
  isDarkMode: false,
};

export const dark = {
  isDarkMode: true,
};

export type ThemeInterface = typeof dark & typeof light;
