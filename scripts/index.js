const board = [
  ["mine", "mine", "mine", "mine", "mine", "mine", "mine"],
  ["mine", "number", "mine", "number", "number", "number", "number"],
  ["mine", "mine", "mine", "mine", "mine", "mine", "number"],
  ["number", "number", "mine", "number", "number", "number", "number"],
  ["number", "number", "number", "number", "number", "number", "number"],
  ["number", "number", "number", "number", "number", "number", "number"],
];
const num_of_rows = board.length;
const num_of_cols = board[0].length;
let mines_counter = 16;
let timer = null;
let initCancelTimer;
let field;
let mine_emoji = "&#x2600;";
const mines = [];
let exploded = false;
let win = false;
const cellsWithoutMines = [];

// Manage of the event listeners with right click
window.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("contextmenu", (e) => putInterrogantOrFlag(e.target));

window.onload = function () {
  document.getElementById("Mines_Screen").innerText = mines_counter;
  document.getElementById("Timer_Screen").innerText = "00";
  field = document.getElementById("board");
  startGame();
};

function startGame() {
  document.getElementById("board").appendChild(createTable());
  fillBoard();
  //randomCell(); To implement Random must be define
  game();
}

function createTable() {
  var table, row, td, i, j;
  table = document.createElement("table");
  for (i = 0; i < num_of_rows; i++) {
    row = document.createElement("tr");
    for (j = 0; j < num_of_cols; j++) {
      td = document.createElement("td");
      td.id = cellID(i, j);
      td.at = board[(i, j)];
      td.classList.add('hidden')
      row.appendChild(td);
    }
    table.appendChild(row);
  }
  return table;
}

function fillBoard() {
  let cell;
  for (i = 0; i < num_of_rows; i++) {
    for (j = 0; j < num_of_cols; j++) {
      cell = document.getElementById(cellID(i, j));
      if (board[i][j] == "mine") {
        mines.push(cell);
      }
      if (board[i][j] == "number") {
        cellsWithoutMines.push(cell);
      }
      cell.classList.add(board[i][j]);
      cleanCell(cell);
      //cell.innerText = board[i][j]; //Can be uncommented to see the board.
    }
  }
}

function cellID(i, j) {
  return "cell-" + i + "-" + j;
}

function restartGame() {
  document.getElementById("Mines_Screen").innerText = "16";
  document.getElementById("Timer_Screen").innerText = "00";
  mines_counter = 16;
  clearInterval(initCancelTimer);
  initCancelTimer = null;
  fillBoard();
  win = false;
}

function putInterrogantOrFlag(cell) {
  if (
    cell.classList.contains("question") ||
    cell.classList.contains("flagged")
  ) {
    if (cell.classList.contains("question")) {
      cell.classList.remove("question");
      document.getElementById(cell.id).innerText = "";
      mines_counter += 1;
      document.getElementById("Mines_Screen").innerText = mines_counter;
    }
    if (cell.classList.contains("flagged")) {
      cell.classList.replace("flagged", "question");
      document.getElementById(cell.id).innerText = "?";
    }
  } else if (cell.classList.contains("hidden")) {
    cell.classList.add("flagged");
    document.getElementById(cell.id).innerText = "F";
    mines_counter -= 1;
    document.getElementById("Mines_Screen").innerText = mines_counter;
    checkForWiningWithFlags();
  }
}

function game() {
  field.addEventListener("click", (e) => revealingACell(e.target));
}

function revealingACell(cell) {
  if (
    !cell.classList.contains("flagged") &&
    !cell.classList.contains("question") &&
    !exploded &&
    !win
  ) {
    if (cell.classList.contains("hidden")) {
      checkForWiningRevealingAllCells();
      cell.classList.replace("hidden", "revealed");
      checkForAMine(cell);

      if (cell.innerText == "0") {
        idString = cell.id.split("-");
        let x = parseInt(idString[1]);
        let y = parseInt(idString[2]);
        revealAdjacent(x, y);
      }
    }
  }
}

function checkForAMine(cell) {
  if (cell.classList.contains("mine")) {
    exploded = true;
    revealingMines();
    gameOver();
  }
  if (!exploded) {
    getNumberOfCell(cell);
  }
}

function revealingMines() {
  mines.forEach((mine) => {
    if (
      !mine.classList.contains("flagged") &&
      !mine.classList.contains("question")
    ) {
      mine.classList.replace("hidden", "revealed");
      document.getElementById(mine.id).innerHTML = mine_emoji;
    }
  });
}

function checkForWiningWithFlags() {
  mines.forEach((mine) => {
    if (mine.classList.contains("flagged")) {
      win = true;
    } else {
      win = false;
    }
  });
  if (win) {
    winning();
  }
}
function checkForWiningRevealingAllCells() {
  for (i = 0; i < num_of_rows; i++) {
    for (j = 0; j < num_of_cols; j++) {
      cell = document.getElementById(cellID(i, j));
      if (
        cell.classList.contains("number") &&
        cell.classList.contains("hidden")
      ) {
        win = false;
        break;
      } else {
        win = true;
      }
    }
  }
  if (win) {
    winning();
  }
}

function gameOver() {
  clearInterval(initCancelTimer);
  initCancelTimer = null;
  window.alert("Game Over Baby");
}
function winning() {
  clearInterval(initCancelTimer);
  initCancelTimer = null;
  window.alert("Okey you are a crack you win this");
}

function getNumberOfCell(cell) {
  idString = cell.id.split("-");
  let x = parseInt(idString[1]);
  let y = parseInt(idString[2]);
  let mines_ad = 0;
  if (haveBomb(x - 1, y)) {
    mines_ad++;
  } //middle left
  if (haveBomb(x - 1, y - 1)) {
    mines_ad++;
  } //upper left
  if (haveBomb(x, y - 1)) {
    mines_ad++;
  } //upper center
  if (haveBomb(x + 1, y - 1)) {
    mines_ad++;
  } //upper right
  if (haveBomb(x + 1, y)) {
    mines_ad++;
  } //middle right
  if (haveBomb(x + 1, y + 1)) {
    mines_ad++;
  } //down right
  if (haveBomb(x, y + 1)) {
    mines_ad++;
  } //down center
  if (haveBomb(x - 1, y + 1)) {
    mines_ad++;
  } //down left
  document.getElementById(cell.id).innerHTML = String(mines_ad);
  return mines_ad;
}

function haveBomb(x, y) {
  if (x < 0 || x >= num_of_rows) {
    return false;
  }

  if (y < 0 || y >= num_of_cols) {
    return false;
  }
  if (board[x][y] == "mine") {
    return true;
  } else {
    return false;
  }
}

function revealAdjacent(x, y) {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      console.log("i: " + i + " J:" + j);
      if (i < 0 || j < 0 || i >= board.length || j >= board[1].length) continue;

      let cell = document.getElementById(cellID(i, j));

      if (cell.classList.contains("revealed")) {
        continue;
      }

      revealingACell(cell);
    }
  }
}

function startTimer() {
  if (initCancelTimer == null) {
    timer = document.getElementById("Timer_Screen");
    initCancelTimer = setInterval(incrementSeconds, 1000);
  }
}

function incrementSeconds() {
  timer.innerText = parseInt(timer.innerText) + 1;
}

function cleanCell(cell) {
  cell.classList.remove("question");
  cell.classList.remove("flagged");
  cell.classList.remove("revealed");
  document.getElementById(cell.id).innerText = "";
  cell.classList.add("hidden");
  exploded = false;
}

function randomCell() {
  let mineLayed = 0;
  while (mineLayed != mines_counter) {
    let cellRow = Math.floor(Math.random() * num_of_rows);
    let cellCol = Math.floor(Math.random() * num_of_cols);
    cell = document.getElementById(cellID(cellRow, cellCol));
    console.log(cell);
    if (!mines.includes(cell)) {
      cell.classList.add("mine");
      mineLayed++;
    }
  }
}

