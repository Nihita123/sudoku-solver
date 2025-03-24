// sudokuSolver.js

// Check if a number is valid at board[row][col]
const isValid = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false; // Row & Column check
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false; // 3x3 Box check
    }
  }

  return true;
};

// Backtracking algorithm to solve the board
const solveSudoku = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) return true; // Continue solving recursively
            board[row][col] = 0; // Backtrack if no solution
          }
        }
        return false; // No solution found
      }
    }
  }
  return true;
};

// Generate a complete, solved Sudoku board
const generateSolvedBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  solveSudoku(board);
  return board;
};

// Randomly remove cells to create a puzzle with adjustable difficulty
const generatePuzzle = (difficulty = 40) => {
  const board = generateSolvedBoard();
  let attempts = difficulty;

  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0; // Remove the number
      attempts--;
    }
  }

  return board;
};

export { solveSudoku, generatePuzzle };
