// Cell.js
import React from "react";

const Cell = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="sudoku-cell"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      maxLength="1"
    />
  );
};

export default Cell;
