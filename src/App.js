// App.js - Sudoku Solver with Wrong Number Indication
import React, { useState, useEffect } from "react";
import "./App.css";

// Helper function to generate a blank Sudoku grid
const generateEmptyGrid = () =>
  Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

// Function to check if the Sudoku number is valid
const isValid = (grid, row, col, num) => {
  // Check row and column
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (grid[i][j] === num) return false;
    }
  }

  return true;
};

// Sudoku solving function (Backtracking algorithm)
const solveSudoku = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Random Sudoku Generator
const generateRandomPuzzle = () => {
  const grid = generateEmptyGrid();
  solveSudoku(grid);

  // Remove random numbers to create a puzzle
  const puzzle = grid.map((row) => [...row]);
  let clues = 40; // Number of visible clues
  while (clues > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      clues--;
    }
  }
  return puzzle;
};

const App = () => {
  const [grid, setGrid] = useState(generateRandomPuzzle());
  const [errors, setErrors] = useState(new Set());

  // Handle cell change and validate input
  const handleChange = (row, col, value) => {
    if (value === "" || (/^[1-9]$/.test(value) && value.length === 1)) {
      const newGrid = grid.map((r) => [...r]);
      newGrid[row][col] = value === "" ? 0 : parseInt(value, 10);
      setGrid(newGrid);
      checkForErrors(newGrid);
    }
  };

  // Validate entire grid and mark errors
  const checkForErrors = (grid) => {
    const newErrors = new Set();

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = grid[row][col];
        if (value !== 0) {
          grid[row][col] = 0; // Temporarily remove to check validity
          if (!isValid(grid, row, col, value)) {
            newErrors.add(`${row}-${col}`);
          }
          grid[row][col] = value; // Restore value
        }
      }
    }
    setErrors(newErrors);
  };

  // Solve Sudoku on button click
  const handleSolve = () => {
    const solvedGrid = grid.map((row) => [...row]);
    solveSudoku(solvedGrid);
    setGrid(solvedGrid);
    setErrors(new Set());
  };

  // Reset Puzzle
  const handleReset = () => {
    setGrid(generateRandomPuzzle());
    setErrors(new Set());
  };

  return (
    <div className="sudoku-container">
      <h1>Sudoku Solver</h1>

      <div className="sudoku-grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isError = errors.has(`${rowIndex}-${colIndex}`);
            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell === 0 ? "" : cell}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e.target.value)
                }
                className={`sudoku-cell ${isError ? "error" : ""} ${
                  rowIndex % 3 === 2 ? "bottom-border" : ""
                } ${colIndex % 3 === 2 ? "right-border" : ""}`}
              />
            );
          })
        )}
      </div>

      <div className="controls">
        <button onClick={handleSolve}>Solve</button>
        <button onClick={handleReset}>New Puzzle</button>
      </div>
    </div>
  );
};

export default App;
