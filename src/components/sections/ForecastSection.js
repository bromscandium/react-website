import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { ForecastCard } from "../cards/ForecastCard";
import "./styles/ForecastSection.css";
import { useIconSize } from "../../hooks/useIconSize";

export const ForecastSection = ({ forecastData, city, formatLabel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const iconSize = useIconSize(24, 12);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth <= 768) setItemsPerView(2);
      else setItemsPerView(3);
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const scrollToIndex = (index) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({
      left: index * 190,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const scrollLeft = () => scrollToIndex(Math.max(0, currentIndex - 1));

  const scrollRight = () => {
    const maxIndex = Math.max(0, forecastData.length - itemsPerView);
    scrollToIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < forecastData.length - itemsPerView;

  return (
    <div className="forecast-page">
      <div className="forecast-container">
        <button
          className="forecast-arrow"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeftIcon width={iconSize} height={iconSize} />
        </button>

        <div className="forecast-scroll" ref={scrollContainerRef}>
          {forecastData.map((item) => (
            <ForecastCard
              key={item.dt}
              city={city}
              time={formatLabel(item.dt)}
              icon={item.weather?.[0]?.icon}
              temp={Math.round(item.main?.temp)}
              realFeel={Math.round(item.main?.feels_like)}
              wind={Math.round(item.wind?.speed)}
              humidity={item.main?.humidity}
              timestamp={item.dt}
            />
          ))}
        </div>

        <button
          className="forecast-arrow"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRightIcon width={iconSize} height={iconSize} />
        </button>
      </div>
    </div>
  );
};
