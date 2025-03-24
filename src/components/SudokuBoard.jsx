// SudokuBoard.js
import React, { useState, useEffect } from "react";
import { solveSudoku, generatePuzzle } from "../sudokuSolver";
import Cell from "./Cell";
import Controls from "./Controls";

const SudokuBoard = () => {
  const [board, setBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    newPuzzle();
  }, []);

  const newPuzzle = () => {
    setBoard(generatePuzzle(40)); // Generate a new random puzzle
    setSelectedCell(null); // Reset selection
  };

  const handleChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = value === "" ? 0 : parseInt(value);
      setBoard(newBoard);
    }
  };

  const handleSolve = () => {
    const solvedBoard = board.map((row) => [...row]);
    if (solveSudoku(solvedBoard)) setBoard(solvedBoard);
    else alert("No solution available!");
  };

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  return (
    <div className="sudoku-container">
      <h1>🧩 Sudoku Solver</h1>
      <div className="sudoku-grid">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const isSelected =
              selectedCell &&
              (selectedCell.row === rowIndex || selectedCell.col === colIndex);

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={value}
                onChange={(val) => handleChange(rowIndex, colIndex, val)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={
                  isSelected
                    ? `sudoku-cell ${
                        selectedCell.row === rowIndex
                          ? "highlight-row"
                          : "highlight-col"
                      }`
                    : "sudoku-cell"
                }
              />
            );
          })
        )}
      </div>
      <Controls onSolve={handleSolve} onReset={newPuzzle} />
    </div>
  );
};

export default SudokuBoard;
