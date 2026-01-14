import React from "react";
import "./styles/ActivityRow.css";
import { PUBLIC_URL } from "../../constants/env";

export const ActivityRow = ({ icon, name, value, quality }) => {
  const getQualityClass = (quality) => {
    if (quality === "Good" || quality === "Low") return "quality-good";
    if (quality === "Moderate") return "quality-moderate";
    return "quality-bad";
  };

  return (
    <div className="activity-row">
      <div className="activity-icon">
        <img src={`${PUBLIC_URL}/icons/activities/${icon}.svg`} alt={name} />
      </div>
      <div className="activity-content">
        <span className="activity-name">{name}:</span>
        <span className={`activity-value ${getQualityClass(quality)}`}>
          {value}
        </span>
      </div>
    </div>
  );
};
