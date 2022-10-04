/*const board = [
    ["mine", "mine", "mine", "mine", "mine", "mine", "mine"],
    ["mine", "number", "mine", "number", "number", "number", "number"],
    ["mine", "mine", "mine", "mine", "mine", "mine", "number"],
    ["number", "number", "mine", "number", "number", "number", "number"],
    ["number", "number", "number", "number", "number", "number", "number"],
    ["number", "number", "number", "number", "number", "number", "number"],
  ];*/

let board = [[], [], [], [], [], [], []];
const num_of_rows = 7;
const num_of_cols = 6;
let mines_counter = 16;
let timer = null;
let initCancelTimer;
let field;
let mine_emoji = "&#x2600;";
let mines = [];
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
  randomCell(); //To implement Random must be define
  fillBoard();
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
      td.classList.add("hidden");
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
      if (!cell.classList.contains("mine")) {
        cell.classList.add("number");
        board[i][j] = "number";
      }
      //cell.innerText = cell.classList; //Can be uncommented to see the board.
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
  cleanAllCells();
  mines = [];
  randomCell();
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
      cell.classList.replace("hidden", "revealed");
      checkForAMine(cell);
      checkForWiningRevealingAllCells();
      if (win) {
        winning();
      } else {
        if (cell.innerText == "0") {
          idString = cell.id.split("-");
          let x = parseInt(idString[1]);
          let y = parseInt(idString[2]);
          revealAdjacent(x, y);
        }
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
        return;
      } else {
        win = true;
      }
    }
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
  setTimeout(function () {
    window.alert("Okey you are a crack you win this");
  }, 10);
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
  cell.classList.remove("mine");
  cell.classList.remove("number");
  document.getElementById(cell.id).innerText = "";
  cell.classList.add("hidden");
  exploded = false;
}

function randomCell() {
  let mineLayed = 0;
  while (mineLayed != mines_counter + 1) {
    let cellRow = Math.floor(Math.random() * num_of_rows);
    let cellCol = Math.floor(Math.random() * num_of_cols);
    cell = document.getElementById(cellID(cellRow, cellCol));
    if (!mines.includes(cell)) {
      cell.classList.add("mine");
      mines.push(cell);
      board[cellRow][cellCol] = "mine";
      mineLayed++;
    }
  }
}

function cleanAllCells() {
  for (i = 0; i < num_of_rows; i++) {
    for (j = 0; j < num_of_cols; j++) {
      cell = document.getElementById(cellID(i, j));
      cleanCell(cell);
      board[i][j] = "";
    }
  }
}
