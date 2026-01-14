import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBarInput } from "../components/inputs/SearchBarInput";
import { LastLocationSection } from "../components/sections/LastLocationSection";
import { getWeather } from "../api/openWeather";
import {
  getSaveLocationsSetting,
  getLastLocations,
  saveLastLocation,
  deleteLastLocation,
} from "../store/locations";
import "./styles/Home.css";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [lastLocations, setLastLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const shouldShowLocations = getSaveLocationsSetting();
    if (shouldShowLocations) {
      const locations = getLastLocations();
      setLastLocations(locations);
    }
  }, []);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const weatherData = await getWeather(searchValue);

      if (!weatherData) {
        setError("City not found. Please try again.");
        setIsLoading(false);
        return;
      }

      const locationData = {
        id: Date.now(),
        city: weatherData.name,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        weatherData: weatherData,
      };

      if (getSaveLocationsSetting()) {
        saveLastLocation(locationData);
        setLastLocations([locationData, ...lastLocations].slice(0, 10));
      }

      navigate(
        `/react-website/weather?city=${encodeURIComponent(weatherData.name)}`,
        {
          state: { weatherData },
        },
      );
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    navigate(
      `/react-website/weather?city=${encodeURIComponent(location.city)}`,
      {
        state: { weatherData: location.weatherData },
      },
    );
  };

  const handleLocationDelete = (locationId) => {
    deleteLastLocation(locationId);
    setLastLocations(lastLocations.filter((loc) => loc.id !== locationId));
  };

  const showLastLocations =
    getSaveLocationsSetting() && lastLocations.length > 0;

  return (
    <div className="home-container">
      <div className="search-section">
        <h1 className="search-title">Search a city for weather...</h1>
        <SearchBarInput
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          disabled={isLoading}
        />
        {error && <p className="error-message">{error}</p>}
        {isLoading && <p className="loading-message">Searching...</p>}
      </div>

      {showLastLocations && (
        <LastLocationSection
          locations={lastLocations}
          onSelect={handleLocationSelect}
          onDelete={handleLocationDelete}
        />
      )}
    </div>
  );
};
