// Controls.js
import React from "react";

const Controls = ({ onSolve, onReset }) => {
  return (
    <div className="controls">
      <button onClick={onSolve}>Solve</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default Controls;
