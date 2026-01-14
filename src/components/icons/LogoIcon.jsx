import React from "react";
import "./styles/LogoIcon.css";
import { PUBLIC_URL } from "../../constants/env";

export const LogoIcon = ({ width = 50, height = 50, alt = "Logo" }) => {
  return (
    <img
      src={`${PUBLIC_URL}/logo512.png`}
      className="logo-icon"
      width={width}
      height={height}
      alt={alt}
    />
  );
};
