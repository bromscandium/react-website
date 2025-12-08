import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ForecastCard } from "../components/cards/ForecastCard";
import { ArrowLeftIcon } from "../components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../components/icons/ArrowRightIcon";
import { getForecast } from "../api/openWeather";
import { getTimeFormatSetting } from "../store/timeFormats";
import "./styles/Forecast.css";

export const DayForecast = () => {
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
      if (data?.list) setForecastData(data.list.slice(0, 24));
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
              time={formatTime(item.dt)}
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
