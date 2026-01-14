import React from "react";
import { PUBLIC_URL } from "../../constants/env";

export const CrossIcon = ({ width = 50, height = 50, alt = "Cross" }) => {
  return (
    <img
      src={`${PUBLIC_URL}/icons/ui/cross.svg`}
      width={width}
      height={height}
      alt={alt}
    />
  );
};
