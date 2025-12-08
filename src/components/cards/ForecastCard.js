import React from "react";
import { useNavigate } from "react-router-dom";
import { getWeatherIcon } from "../../helpers/weatherIcon";
import "./styles/ForecastCard.css";

export const ForecastCard = ({
  city,
  temp,
  icon,
  time,
  realFeel,
  wind,
  humidity,
  timestamp,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/weather?city=${encodeURIComponent(city)}&timestamp=${timestamp}`,
    );
  };

  return (
    <div className="forecast-card" onClick={handleClick}>
      <div className="forecast-time">{time}</div>
      <img
        className="forecast-icon"
        src={getWeatherIcon(icon)}
        alt="weather icon"
      />
      <div className="forecast-temp">{Math.round(temp)}°</div>

      <div className="forecast-details">
        <div className="forecast-detail">
          <span className="forecast-label">RealFeel:</span>
          <span className="forecast-value">{realFeel}°</span>
        </div>
        <div className="forecast-detail">
          <span className="forecast-label">Wind:</span>
          <span className="forecast-value">{wind} km/h</span>
        </div>
        <div className="forecast-detail">
          <span className="forecast-label">Humidity:</span>
          <span className="forecast-value">{humidity}%</span>
        </div>
      </div>
    </div>
  );
};
