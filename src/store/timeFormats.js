import { STORAGE_KEYS } from "../constants/localStorage";

export const getTimeFormatSetting = () => {
  const value = localStorage.getItem(STORAGE_KEYS.TIME_FORMAT);
  return value || "12";
};

export const setTimeFormatSetting = (format) => {
  localStorage.setItem(STORAGE_KEYS.TIME_FORMAT, format);
};
