import React from "react";
import { BinIcon } from "../icons/BinIcon";
import { useIconSize } from "../../hooks/useIconSize";

export const DeleteButton = ({ onClick }) => {
  const iconSize = useIconSize(22, 16);
  return (
    <button onClick={onClick}>
      <BinIcon width={iconSize} height={iconSize} />
    </button>
  );
};
