import React from "react";
import { CrossIcon } from "../icons/CrossIcon";

export const CancelButton = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Cancel">
      <CrossIcon width={40} height={40} />
    </button>
  );
};
