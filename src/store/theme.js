import { STORAGE_KEYS } from "../constants/localStorage";
import { THEMES } from "../constants/themes";

export const getThemeSetting = () => {
  const value = localStorage.getItem(STORAGE_KEYS.THEME);
  return value || THEMES.LIGHT;
};

export const setThemeSetting = (theme) => {
  if (theme !== THEMES.LIGHT && theme !== THEMES.DARK) return;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  applyTheme(theme);
};

export const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const initializeTheme = () => {
  const theme = getThemeSetting();
  applyTheme(theme);
};
