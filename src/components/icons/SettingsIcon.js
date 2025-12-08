import React from "react";
import { PUBLIC_URL } from "../../constants/env";

export const SettingsIcon = ({ width = 50, height = 50, alt = "Settings" }) => {
  return (
    <img
      src={`${PUBLIC_URL}/icons/ui/gear.svg`}
      width={width}
      height={height}
      alt={alt}
    />
  );
};
