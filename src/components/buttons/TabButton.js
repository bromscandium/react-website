import React from "react";
import "./styles/TabButton.css";

export const TabButton = ({ label, active, onClick }) => {
  return (
    <button
      className={`tab-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
