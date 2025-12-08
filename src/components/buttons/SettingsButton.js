import React from "react";
import { GearIcon } from "../icons/GearIcon";

export const SettingsButton = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Settings">
      <GearIcon width={40} height={40} />
    </button>
  );
};
