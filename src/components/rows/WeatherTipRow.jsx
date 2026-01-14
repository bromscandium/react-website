import React from "react";
import "./styles/WeatherTipRow.css";

export const WeatherTipRow = ({ tip }) => {
  if (!tip) return null;

  return (
    <div className="tip-row">
      <div className="tip-content">
        <h3 className="tip-title">Small Tip:</h3>
        <p className="tip-text">{tip}</p>
      </div>
    </div>
  );
};
