/*
  cellPx determines the resolution (width, height) of a cell drawn to the screen
  it is important to choose a size which divides the width and the height of the canvas without rest
  used screen res in this case (width: 1280, height: 640). 1280 % 32 = 0 && 640 % 32 = 0
*/
const cellPx = 32;

let playfield = [];

/*
  create a m x n playfield and populate it with random bits (0, 1)
*/
function initPlayfield(m, n) {
  for (let i = 0; i < m; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      let bit = Math.round(Math.random());
      row.push(bit);
    }
    playfield.push(row);
  }
}

/*
  1) Create a copy of the current playfield
  2) For each cell on the playfield determine the resulting state in the next generation.
     0 -> 1 if neighbors == 3; 1 -> 0 if neighbors < 2 || neighbors > 3
  3) Assign the copy of the playfield to the playfield
*/
function updateCells() {
  let playfieldCp = [];
  for (let i = 0; i < playfield.length; i++) {
    let row = [...playfield[i]];
    playfieldCp.push(row);
  }

  for (let i = 0; i < playfield.length; i++) {
    for (let j = 0; j < playfield[i].length; j++) {
      let neighbors = countLivingNeighbors(i, j);
      if (playfield[i][j] === 0 && neighbors === 3) {
        playfieldCp[i][j] = 1;
      } else if (playfield[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
        playfieldCp[i][j] = 0;
      }
    }
  }

  playfield = playfieldCp;
}

/*
  count the number of living neighbors of a given cell at pos (x, y)
  by building the sum of all neighbors around the given cell. The given cell at (x, y) itself is also added
  and subtracted at the end
*/
function countLivingNeighbors(x, y) {
  let count = 0;
  for (let i = (x - 1); i <= (x + 1); i++) {
    for (let j = (y - 1); j <= (y + 1); j++) {
      if (i >= 0 && i < playfield.length) {
        if (j >= 0 && j < playfield[i].length) {
          count += playfield[i][j];
        }
      }
    }
  }
  count -= playfield[x][y];
  return count;
}

function drawGrid(width, height) {
  for (let i = 0; i < height; i += cellPx) {
    line(0, i, width, i);
  }
  for (let j = 0; j < width; j += cellPx) {
    line(j, 0, j, height);
  }
}

function drawCells() {
  for (let i = 0; i < playfield.length; i++) {
    for (let j = 0; j < playfield[i].length; j++) {
      if (playfield[i][j] === 1) {
        let x = i * cellPx;
        let y = j * cellPx;
        rect(x, y, cellPx);
      }
    }
  }
}

function setup() {
  createCanvas(1280, 640);
  frameRate(1);

  initPlayfield((width / cellPx), (height / cellPx));
}

function draw() {
  background(202, 209, 216);
  fill(14, 17, 22);

  drawGrid(width, height);
  drawCells();
  updateCells();
}