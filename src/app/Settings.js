import React, { useState } from "react";
import { SettingRow } from "../components/rows/SettingRow";
import { getUnitsSetting, setUnitsSetting } from "../store/units";
import { UNITS } from "../constants/units";
import {
  getSaveLocationsSetting,
  setSaveLocationsSetting,
} from "../store/locations";
import {
  getTimeFormatSetting,
  setTimeFormatSetting,
} from "../store/timeFormats";
import "./styles/Settings.css";
import { THEMES } from "../constants/themes";
import { getThemeSetting, setThemeSetting } from "../store/theme";

export const Settings = () => {
  const [units, setUnits] = useState(getUnitsSetting());
  const [saveLocations, setSaveLocationsState] = useState(
    getSaveLocationsSetting(),
  );
  const [timeFormat, setTimeFormatState] = useState(getTimeFormatSetting());
  const [theme, setThemeState] = useState(getThemeSetting());

  const handleUnitsChange = (value) => {
    setUnits(value);
    setUnitsSetting(value);
  };

  const handleSaveLocationsChange = (value) => {
    const boolValue = value === "on";
    setSaveLocationsState(boolValue);
    setSaveLocationsSetting(boolValue);
  };

  const handleTimeFormatChange = (value) => {
    setTimeFormatState(value);
    setTimeFormatSetting(value);
  };

  const handleThemeChange = (value) => {
    setThemeState(value);
    setThemeSetting(value);
  };

  const unitsOptions = [
    { label: "Metric (°C, km/h, hPa)", value: UNITS.METRIC },
    { label: "Imperial (°F, mph, inHg)", value: UNITS.IMPERIAL },
  ];

  const locationOptions = [
    { label: "On", value: "on" },
    { label: "Off", value: "off" },
  ];

  const timeOptions = [
    { label: "12-hour", value: "12" },
    { label: "24-hour", value: "24" },
  ];

  const themeOptions = [
    { label: "Light", value: THEMES.LIGHT },
    { label: "Dark", value: THEMES.DARK },
  ];

  return (
    <div className="settings-container">
      <div className="settings-section">
        <h2 className="settings-section-title">General</h2>

        <SettingRow
          label="Theme"
          options={themeOptions}
          selectedValue={theme}
          onChange={handleThemeChange}
        />
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Units</h2>

        <SettingRow
          label="Units"
          options={unitsOptions}
          selectedValue={units}
          onChange={handleUnitsChange}
        />

        <SettingRow
          label="Time Format"
          options={timeOptions}
          selectedValue={timeFormat}
          onChange={handleTimeFormatChange}
        />
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Privacy</h2>

        <SettingRow
          label="Save Last Locations"
          options={locationOptions}
          selectedValue={saveLocations ? "on" : "off"}
          onChange={handleSaveLocationsChange}
        />
      </div>
    </div>
  );
};
