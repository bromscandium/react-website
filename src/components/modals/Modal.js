import React, { useEffect } from "react";
import { CancelButton } from "../buttons/CancelButton";
import "./styles/Modal.css";

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <CancelButton onClick={onClose} />
          <h2 className="modal-title">{title}</h2>
          <div className="modal-header-spacer"></div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
