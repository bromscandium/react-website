import React from "react";
import { PUBLIC_URL } from "../../constants/env";

export const LogoIcon = ({ width = 50, height = 50, alt = "Logo" }) => {
  return (
    <img
      src={`${PUBLIC_URL}/logo512.png`}
      width={width}
      height={height}
      alt={alt}
    />
  );
};
