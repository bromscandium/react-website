import { getUnitsSetting } from "../store/units";

export const getWeather = async (city) => {
  const units = getUnitsSetting();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${units}`;

  const response = await fetch(url);
  if (!response.ok) return null;

  return await response.json();
};

export const getAirQuality = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) return null;

  const data = await response.json();
  return data.list[0].main.aqi;
};

export const getForecast = async (city) => {
  const units = getUnitsSetting();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${units}`;

  const response = await fetch(url);
  if (!response.ok) return null;

  return await response.json();
};

export const getWeatherMapTileUrl = (layer, z, x, y) => {
  return `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
};
