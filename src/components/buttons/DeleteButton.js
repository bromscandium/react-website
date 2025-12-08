import React from "react";
import { BinIcon } from "../icons/BinIcon";

export const DeleteButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <BinIcon width={22} height={22} />
    </button>
  );
};
