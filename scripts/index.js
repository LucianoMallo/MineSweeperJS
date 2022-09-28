const board = [
  ["*", "*", "*", "*", "*", "*", "*"],
  ["*", "-", "*", "-", "-", "-", "-"],
  ["*", "*", "*", "*", "*", "*", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

let hmtlBoard = null;
const num_of_rows = board.length;
const num_of_cols = board[0].length;
let mines = 16;
let timer = null;
let initCancelTimer;
let field;

// Manage of the event listeners with right click
window.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("contextmenu", (e) => putInterrogantOrFlag(e.target));

window.onload = function () {
  document.getElementById("Mines_Screen").innerText = mines;
  document.getElementById("Timer_Screen").innerText = "00";
  field = document.getElementById("board");
  startGame();
};

function startGame() {
  document.getElementById("board").appendChild(createTable());
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
      row.appendChild(td);
    }
    table.appendChild(row);
  }
  return table;
}

function fillBoard() {
  let cell, td;
  for (i = 0; i < num_of_rows; i++) {
    for (j = 0; j < num_of_cols; j++) {
      cell = document.getElementById(cellID(i, j));
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
  clearInterval(initCancelTimer);
  initCancelTimer = null;
  fillBoard();
}

function putInterrogantOrFlag(cell) {
  if (
    cell.classList.contains("question") ||
    cell.classList.contains("flagged")
  ) {
    if (cell.classList.contains("question")) {
      cell.classList.remove("question");
      mines += 1;
      document.getElementById("Mines_Screen").innerText = mines;
    }
    if (cell.classList.contains("flagged")) {
      cell.classList.replace("flagged", "question");
    }
  } else if (cell.classList.contains("hidden")) {
    cell.classList.add("flagged");
    mines -= 1;
    document.getElementById("Mines_Screen").innerText = mines;
  }
}

function game() {
  field.addEventListener("click", (e) => revealingACell(e.target));
}

function revealingACell(cell) {
  if (
    !cell.classList.contains("flagged") &&
    !cell.classList.contains("question")
  ) {
    if (cell.classList.contains("hidden")) {
      cell.classList.replace("hidden", "revealed");
      checkMines(cell);
    }
  }
}

function checkMines(cell) {
  if (cell.classList.contains("*")) {
    clearInterval(initCancelTimer);
    window.alert("Game Over Baby");
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
  cell.classList.add("hidden");
}

/*const board = [
  ["*", "*", "*", "*", "*", "*", "*"],
  ["*", "8", "*", "7", "6", "5", "4"],
  ["*", "*", "*", "*", "*", "*", "1"],
  ["2", "3", "3", "3", "3", "2", "1"],
  ["0", "0", "0", "0", "0", "0", "0"],
];*/
