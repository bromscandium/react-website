import React from "react";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import "./styles/CityButton.css";
import { useIconSize } from "../../hooks/useIconSize";

export const CityButton = ({ onClick, city }) => {
  const iconSize = useIconSize(36, 18);

  return (
    <div className="city-button" role="button" tabIndex={0} onClick={onClick}>
      <ArrowLeftIcon width={iconSize} height={iconSize} />
      <span className="city-button-text">{city}</span>
    </div>
  );
};
