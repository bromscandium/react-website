import React, { useState, useRef, useEffect } from "react";
import { LocationCard } from "../cards/LocationCard";
import "./styles/LastLocationSection.css";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { getWeatherIcon } from "../../helpers/weatherIcon";

export const LastLocationSection = ({ locations, onSelect, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth <= 768) {
        setItemsPerView(2);
      } else if (window.innerWidth <= 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(3);
      }
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  useEffect(() => {
    updateScrollButtons();
  }, [currentIndex, locations, itemsPerView]);

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scrollToIndex = (index) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollPosition = index * 220;
    el.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const scrollLeft = () => {
    scrollToIndex(Math.max(0, currentIndex - 1));
  };

  const scrollRight = () => {
    const maxIndex = Math.max(0, locations.length - itemsPerView);
    scrollToIndex(Math.min(maxIndex, currentIndex + 1));
  };

  if (!locations?.length) return null;

  const showArrows = locations.length > itemsPerView;

  return (
    <div className="last-locations-section">
      <h2 className="section-title">Last locations:</h2>

      <div className="locations-carousel">
        {showArrows && canScrollLeft && (
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={scrollLeft}
          >
            <ArrowLeftIcon width={20} height={20} />
          </button>
        )}

        <div
          className="locations-row"
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
        >
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              city={location.city}
              country={location.country}
              temperature={location.temperature}
              lastSearched={location.lastSearched}
              units={location.savedUnits}
              icon={
                location.weatherData?.weather?.[0]?.icon ? (
                  <img
                    src={getWeatherIcon(location.weatherData.weather[0].icon)}
                    alt="Weather"
                  />
                ) : null
              }
              onSelect={() => onSelect(location)}
              onDelete={() => onDelete(location.id)}
            />
          ))}
        </div>

        {showArrows && canScrollRight && (
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={scrollRight}
          >
            <ArrowRightIcon width={20} height={20} />
          </button>
        )}
      </div>
    </div>
  );
};
