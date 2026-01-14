import React from "react";
import { LogoIcon } from "../icons/LogoIcon";
import { useIconSize } from "../../hooks/useIconSize";

export const LogoButton = ({ onClick }) => {
  const iconSize = useIconSize(40, 20);
  return (
    <button onClick={onClick} aria-label="Settings">
      <LogoIcon width={iconSize} height={iconSize} />
    </button>
  );
};
