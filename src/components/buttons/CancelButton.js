import React from "react";
import { CrossIcon } from "../icons/CrossIcon";

export const CancelButton = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Cancel">
      <CrossIcon width={30} height={30} />
    </button>
  );
};
