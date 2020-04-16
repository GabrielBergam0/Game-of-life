const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 10;
canvas.width = 600;
canvas.height = 600;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function buildGrid() {
  const grid = new Array(COLS).fill(null)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(ROWS).fill(null)
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = Math.floor(Math.random() * 2) 
    }
    return grid
    }
}

var grid = buildGrid();

requestAnimationFrame(update);

function update() {
  grid = getNextGeneration(grid);
  render(grid);
  requestAnimationFrame(update);
}

const getNextGeneration = (grid) => {
    const nextGrid = new Array(grid.length)
    for (let i = 0; i < grid.length; i++) {
      nextGrid[i] = new Array(grid.length)
      for (let j = 0; j < nextGrid[i].length; j++) {
        const value = grid[i][j]
        const neighbors = countNeighbors(grid, i, j)
        if (value === 0 && neighbors === 3) {
          nextGrid[i][j] = 1
        } else if (
          (value === 1) &&
          (neighbors < 2 || neighbors > 3)
        ) {
          nextGrid[i][j] = 0
        } else {
          nextGrid[i][j] = value
        }
      }
    }
    return nextGrid
}

const countNeighbors = (grid, x, y) => {
    let sum = 0
    const numberOfRows = grid.length
    const numberOfCols = grid[0].length
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const row = (x + i + numberOfRows) % numberOfRows
        const col = (y + j + numberOfCols) % numberOfCols
        sum += grid[row][col]
      }
    }
    sum -= grid[x][y]
    return sum
}

function render(grid){
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[j][i];

        ctx.beginPath();
        ctx.rect(col * resolution, row * resolution, resolution, resolution);
        ctx.fillStyle = cell ? 'black' : 'white';
        ctx.fill();
        ctx.stroke();
        }
    }
}