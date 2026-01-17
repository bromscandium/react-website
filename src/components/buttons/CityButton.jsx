import React from "react";
import "./styles/CityButton.css";

export const CityButton = ({ onClick, city }) => {
  return (
    <div className="city-button" role="button" tabIndex={0} onClick={onClick}>
      <span className="city-button-text">{city}</span>
    </div>
  );
};
