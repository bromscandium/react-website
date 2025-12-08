import React from "react";
import "./styles/SearchBarInput.css";
import { MagnifyingGlassIcon } from "../icons/MagnifyingGlassIcon";

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
      <MagnifyingGlassIcon width={20} height={20} />
    </form>
  );
};
