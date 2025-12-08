import React from "react";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import "./styles/CityButton.css";

export const CityButton = ({ onClick, city }) => {
  return (
    <div className="city-button" role="button" tabIndex={0} onClick={onClick}>
      <ArrowLeftIcon width={36} height={36} />
      <span className="city-button-text">{city}</span>
    </div>
  );
};
