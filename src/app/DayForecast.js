import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getForecast } from "../api/openWeather";
import { getTimeFormatSetting } from "../store/timeFormats";
import { ForecastSection } from "../components/sections/ForecastSection";

export const DayForecast = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get("city");
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) {
      navigate("/");
      return;
    }

    const fetchForecast = async () => {
      setLoading(true);
      const data = await getForecast(city);

      if (data?.list) {
        setForecastData(data.list.slice(0, 8));
      }

      setLoading(false);
    };

    fetchForecast();
  }, [city, navigate]);

  const formatTime = (timestamp) => {
    const timeFormat = getTimeFormatSetting();
    const date = new Date(timestamp * 1000);

    if (timeFormat === "24") {
      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  if (loading) return <div className="forecast-loading">Loading...</div>;

  return (
    <ForecastSection
      forecastData={forecastData}
      city={city}
      formatLabel={formatTime}
    />
  );
};
