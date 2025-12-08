import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getForecast } from "../api/openWeather";
import { ForecastSection } from "../components/sections/ForecastSection";

export const WeekForecast = () => {
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
        const grouped = {};

        data.list.forEach((item) => {
          const date = new Date(item.dt * 1000).toDateString();
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(item);
        });

        const dailyForecasts = Object.keys(grouped).map((date) =>
          grouped[date].reduce((prev, curr) => {
            const prevHour = new Date(prev.dt * 1000).getHours();
            const currHour = new Date(curr.dt * 1000).getHours();
            return Math.abs(currHour - 12) < Math.abs(prevHour - 12)
              ? curr
              : prev;
          }),
        );

        setForecastData(dailyForecasts.slice(0, 7));
      }

      setLoading(false);
    };

    fetchForecast();
  }, [city, navigate]);

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return <div className="forecast-loading">Loading...</div>;

  return (
    <ForecastSection
      forecastData={forecastData}
      city={city}
      formatLabel={formatDay}
    />
  );
};
