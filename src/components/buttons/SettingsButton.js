import React from "react";
import { GearIcon } from "../icons/GearIcon";
import { useIconSize } from "../../hooks/useIconSize";

export const SettingsButton = ({ onClick }) => {
  const iconSize = useIconSize(40, 20);
  return (
    <button onClick={onClick} aria-label="Settings">
      <GearIcon width={iconSize} height={iconSize} />
    </button>
  );
};
