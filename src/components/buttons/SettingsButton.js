import React from "react";
import { SettingsIcon } from "../icons/SettingsIcon";

export const SettingsButton = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Settings">
      <SettingsIcon width={40} height={40} />
    </button>
  );
};
