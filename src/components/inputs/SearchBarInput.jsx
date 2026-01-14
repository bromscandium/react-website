import React from "react";
import "./styles/SearchBarInput.css";
import { MagnifyingGlassIcon } from "../icons/MagnifyingGlassIcon";
import { useIconSize } from "../../hooks/useIconSize";

export const SearchBarInput = ({
  value,
  onChange,
  onSearch,
  disabled = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && !disabled) onSearch();
  };

  const iconSize = useIconSize(20, 10);

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Write a city here"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      <button
        className="search-button"
        disabled={disabled}
        onClick={handleSubmit}
      >
        <MagnifyingGlassIcon width={iconSize} height={iconSize} />
      </button>
    </form>
  );
};
