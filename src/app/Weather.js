import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ModalRow } from "../components/rows/ModalRow";
import { WeatherTipRow } from "../components/rows/WeatherTipRow";
import { TemperatureInfo } from "../components/infos/TemperatureInfo";
import { WeatherInfo } from "../components/infos/WeatherInfo";
import { getWeather, getAirQuality, getForecast } from "../api/openWeather";
import { ActivitiesModal } from "../components/modals/ActivitiesModal";
import { MapModal } from "../components/modals/MapModal";
import { getAirQualityText } from "../helpers/airQuality";
import { getWeatherIcon } from "../helpers/weatherIcon";
import { getWeatherTip } from "../helpers/weatherTips";
import "./styles/Weather.css";

export const Weather = () => {
  const [searchParams] = useSearchParams();
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [latLon, setLatLon] = useState({ lat: null, lon: null });
  const [weatherTip, setWeatherTip] = useState(null);
  const navigate = useNavigate();

  const city = searchParams.get("city");
  const timestamp = searchParams.get("timestamp");

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        let data, lat, lon;

        if (timestamp) {
          const forecastData = await getForecast(city);
          if (!forecastData) {
            setError("Failed to fetch forecast data");
            return;
          }

          const targetData = forecastData.list.find(
            (item) => item.dt === parseInt(timestamp),
          );

          if (!targetData) {
            setError("Weather data not found");
            return;
          }

          data = { ...targetData, coord: forecastData.city.coord };
          lat = forecastData.city.coord.lat;
          lon = forecastData.city.coord.lon;
        } else {
          data = await getWeather(city);
          if (!data) {
            setError("Failed to fetch weather data");
            return;
          }

          lat = data.coord.lat;
          lon = data.coord.lon;
        }

        setWeatherData(data);
        setLatLon({ lat, lon });
        setWeatherTip(getWeatherTip(data));

        const aqi = await getAirQuality(lat, lon);
        setAirQualityData({ aqi, text: getAirQualityText(aqi) });
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, timestamp, navigate]);

  if (loading) return <div className="weather-container">Loading...</div>;
  if (error || !weatherData)
    return (
      <div className="weather-container">{error || "No data available"}</div>
    );

  return (
    <div className="weather-container">
      <div className="weather-top-row">
        <TemperatureInfo
          temperature={Math.round(weatherData.main.temp)}
          realFeel={Math.round(weatherData.main.feels_like)}
          iconUrl={getWeatherIcon(weatherData.weather[0].icon)}
        />
        <WeatherInfo
          wind={Math.round(weatherData.wind.speed * 3.6)}
          humidity={weatherData.main.humidity}
          airQuality={airQualityData?.text || "N/A"}
        />
      </div>

      <WeatherTipRow tip={weatherTip} />

      <ModalRow
        onDetailsClick={() => setIsDetailsOpen(true)}
        onMapClick={() => setIsMapOpen(true)}
      />

      <ActivitiesModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        weatherData={weatherData}
        airQuality={airQualityData?.text}
      />

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        lat={latLon.lat}
        lon={latLon.lon}
        city={city}
      />
    </div>
  );
};
