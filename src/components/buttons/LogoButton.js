import React from "react";
import { LogoIcon } from "../icons/LogoIcon";

export const LogoButton = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Settings">
      <LogoIcon width={40} height={40} />
    </button>
  );
};
