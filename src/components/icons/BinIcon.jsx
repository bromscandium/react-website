import React from "react";
import { PUBLIC_URL } from "../../constants/env";

export const BinIcon = ({ width = 50, height = 50, alt = "Bin" }) => {
  return (
    <img
      src={`${PUBLIC_URL}/icons/ui/bin.svg`}
      width={width}
      height={height}
      alt={alt}
    />
  );
};
