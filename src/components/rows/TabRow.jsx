import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TabButton } from "../buttons/TabButton";
import "./styles/TabRow.css";
import { tabs } from "../../constants/tabs";

export const TabRow = ({ city }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (path) => {
    navigate(`${path}?city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="tab-row">
      {tabs.map((tab) => (
        <TabButton
          key={tab.path}
          label={tab.label}
          active={location.pathname === tab.path}
          onClick={() => handleTabClick(tab.path)}
        />
      ))}
    </div>
  );
};
