# Sudoku Solver

A **React-based Sudoku Solver** where users can solve puzzles, get solutions instantly, and check for mistakes in real-time. Each new puzzle is generated dynamically, providing endless gameplay.

## 📚 Algorithm Used – Backtracking

The Sudoku Solver uses the Backtracking Algorithm, which is a depth-first search approach to find the correct solution by trying all possibilities recursively.

### 🔎 How the Backtracking Algorithm Works:

Find an empty cell: Identify the first empty cell on the board.

Try a number: Place numbers (1-9) in that cell.

Check validity: If the number is valid (does not repeat in the row, column, or 3x3 box), move to the next empty cell.

Recurse: Repeat the process for the next empty cell.

Backtrack if necessary: If no valid number is found, backtrack to the previous cell and try the next possible number.

Solution found: The algorithm terminates when the board is completely filled with valid numbers.

### 📊 Time Complexity:

Worst Case: 𝑂(9^81) – In the worst case, the algorithm explores all possibilities.

Average Case: Faster due to pruning by checking constraints (valid row, column, and box).
