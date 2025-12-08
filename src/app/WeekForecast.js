import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ForecastCard } from "../components/cards/ForecastCard";
import { ArrowLeftIcon } from "../components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../components/icons/ArrowRightIcon";
import { getForecast } from "../api/openWeather";
import "./styles/Forecast.css";

export const WeekForecast = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get("city");
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setItemsPerView(2);
      else if (window.innerWidth <= 1024) setItemsPerView(3);
      else setItemsPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        setForecastData(dailyForecasts.slice(0, 5));
      }

      setLoading(false);
    };

    fetchForecast();
  }, [city, navigate]);

  const scrollToIndex = (index) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({
      left: index * 170,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const scrollLeft = () => scrollToIndex(Math.max(0, currentIndex - 1));

  const scrollRight = () =>
    scrollToIndex(
      Math.min(
        Math.max(0, forecastData.length - itemsPerView),
        currentIndex + 1,
      ),
    );

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
    <div className="forecast-page">
      <div className="forecast-container">
        <button
          className="forecast-arrow"
          onClick={scrollLeft}
          disabled={currentIndex === 0}
        >
          <ArrowLeftIcon />
        </button>

        <div className="forecast-scroll" ref={scrollContainerRef}>
          {forecastData.map((item) => (
            <ForecastCard
              key={item.dt}
              time={formatDay(item.dt)}
              icon={item.weather?.[0]?.icon}
              temp={Math.round(item.main?.temp)}
            />
          ))}
        </div>

        <button
          className="forecast-arrow"
          onClick={scrollRight}
          disabled={currentIndex >= forecastData.length - itemsPerView}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};
