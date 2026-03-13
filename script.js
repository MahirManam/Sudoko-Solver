const gridBody = document.getElementById("gridBody");

// Generate 9x9 grid
for (let i = 0; i < 9; i++) {
  const row = document.createElement("tr");

  for (let j = 0; j < 9; j++) {
    const cell = document.createElement("td");
    const input = document.createElement("input");

    input.type = "text";
    input.maxLength = "1";
    input.name = `cell-${i}-${j}`;

    cell.appendChild(input);
    row.appendChild(cell);
  }

  gridBody.appendChild(row);
}

document.getElementById("gridForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let grid = [];

  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      const value = this[`cell-${i}-${j}`].value || ".";
      row.push(value);
    }
    grid.push(row);
  }

    solve(grid);

    // Display solved Sudoku
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      this[`cell-${i}-${j}`].value = grid[i][j];
    }
  }

});

document.getElementById("clear").onclick = function() {
  document.querySelectorAll("input").forEach(cell=>{
    cell.value="";
  });
};

function solve(grid) {
    const n = 9;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {

            if (grid[i][j] === '.') {

                for (let dig = 1; dig <= 9; dig++) {
                    let digit = dig.toString();

                    if (areRulesMet(grid, i, j, digit)) {
                        grid[i][j] = digit;

                        if (solve(grid)) {
                            return true;
                        } else {
                            grid[i][j] = '.';
                        }
                    }
                }

                return false;
            }
        }
    }

    return true;
}

function areRulesMet(grid, row, col, digit) {

    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === digit) {
            return false;
        }

        if (grid[i][col] === digit) {
            return false;
        }
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === digit) {
                return false;
            }
        }
    }

    return true;
}

