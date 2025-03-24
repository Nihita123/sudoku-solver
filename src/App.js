// App.js - Slower Backtracking Animation
import React, { useState } from "react";
import "./App.css";

// Generate an empty 9x9 Sudoku board
const initialBoard = Array(9)
  .fill(null)
  .map(() => Array(9).fill(""));

const App = () => {
  // Helper: Validate if a number is safe to place
  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;

      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  };

  // Backtracking solver
  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num.toString())) {
              board[row][col] = num.toString();
              if (solveSudoku(board)) return true;
              board[row][col] = ""; // Backtrack
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // Random puzzle generator
  const generateSudoku = () => {
    let puzzle = initialBoard.map((row) => [...row]);
    solveSudoku(puzzle); // Solve a complete grid
    removeNumbers(puzzle); // Remove numbers to create a puzzle
    return puzzle;
  };

  // Remove random numbers to create a solvable puzzle
  const removeNumbers = (puzzle) => {
    let attempts = 40; // Controls difficulty (more = harder)
    while (attempts > 0) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== "") {
        puzzle[row][col] = "";
        attempts--;
      }
    }
  };

  // Board State
  const [board, setBoard] = useState(generateSudoku());
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });

  // Animate solving with a slower delay
  const animateSolve = async () => {
    const copy = board.map((row) => [...row]);
    await visualizeSolve(copy);
    setBoard(copy);
  };

  // Visualize the solving process (slower animation)
  const visualizeSolve = async (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num.toString())) {
              board[row][col] = num.toString();
              setBoard([...board]);
              await new Promise((resolve) => setTimeout(resolve, 200)); // Slower delay (200ms)
              if (await visualizeSolve(board)) return true;
              board[row][col] = ""; // Backtrack
              setBoard([...board]);
              await new Promise((resolve) => setTimeout(resolve, 200)); // Backtracking delay (200ms)
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // Handle user input (validate digits 1-9 only)
  const handleChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = value;
      setBoard(newBoard);
    }
  };

  // Highlight selected row and column
  const handleSelect = (row, col) => setSelectedCell({ row, col });

  // Reset board with a new puzzle
  const resetBoard = () => setBoard(generateSudoku());

  return (
    <div className="sudoku-container">
      <h1>Sudoku Solver</h1>

      {/* Sudoku Grid */}
      <div className="sudoku-grid">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              rowIndex === selectedCell.row || colIndex === selectedCell.col;
            const isGreyBox =
              Math.floor(rowIndex / 3) % 2 === Math.floor(colIndex / 3) % 2;

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                className={`sudoku-cell ${isSelected ? "highlight" : ""} ${
                  isGreyBox ? "grey-box" : "white-box"
                }`}
                value={cell}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e.target.value)
                }
                onClick={() => handleSelect(rowIndex, colIndex)}
                readOnly={cell !== ""}
              />
            );
          })
        )}
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={resetBoard}>New Puzzle</button>
        <button onClick={animateSolve}>Solve (Slow)</button>
      </div>
    </div>
  );
};

export default App;
