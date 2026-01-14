import React from "react";
import { PUBLIC_URL } from "../../constants/env";

export const MagnifyingGlassIcon = ({
  width = 50,
  height = 50,
  alt = "MagnifyingGlass",
}) => {
  return (
    <img
      src={`${PUBLIC_URL}/icons/ui/magnifying-glass.svg`}
      width={width}
      height={height}
      alt={alt}
    />
  );
};
