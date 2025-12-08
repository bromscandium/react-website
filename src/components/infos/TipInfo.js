import React from "react";
import "./styles/TipInfo.css";

export const TipInfo = ({ tip }) => {
  if (!tip) return null;

  return (
    <div className="tip-info">
      <h3 className="tip-title">Small Tip:</h3>
      <p className="tip-text">{tip}</p>
    </div>
  );
};
