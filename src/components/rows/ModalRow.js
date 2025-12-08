import React from "react";
import { TabButton } from "../buttons/TabButton";
import "./styles/ModalRow.css";

export const ModalRow = ({ onDetailsClick, onMapClick }) => {
  return (
    <div className="modal-row">
      <TabButton label="Details" onClick={onDetailsClick} />
      <TabButton label="Map" onClick={onMapClick} />
    </div>
  );
};
