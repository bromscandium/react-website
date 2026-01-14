import React from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { useIconSize } from "../../hooks/useIconSize";

export const CancelButton = ({ onClick }) => {
  const iconSize = useIconSize(40, 20);
  return (
    <button onClick={onClick} aria-label="Cancel">
      <CrossIcon width={iconSize} height={iconSize} />
    </button>
  );
};
