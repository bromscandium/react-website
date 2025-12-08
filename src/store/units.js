import { STORAGE_KEYS } from "../constants/localStorage";
import { UNITS } from "../constants/units";

export const getUnitsSetting = () => {
  const value = localStorage.getItem(STORAGE_KEYS.UNITS);
  return value || UNITS.METRIC;
};

export const setUnitsSetting = (units) => {
  if (units !== UNITS.METRIC && units !== UNITS.IMPERIAL) return;
  localStorage.setItem(STORAGE_KEYS.UNITS, units);
};

export const getTemperatureUnitSymbol = (units) => {
  return units === UNITS.IMPERIAL ? "°F" : "°C";
};

export const formatTemperature = (temp, units) => {
  const symbol = getTemperatureUnitSymbol(units);
  return `${temp}${symbol}`;
};

export const getWindSpeedUnit = (units) => {
  return units === UNITS.IMPERIAL ? "mph" : "km/h";
};
