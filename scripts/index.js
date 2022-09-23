const board = [
  ["*", "*", "*", "*", "*", "*", "*"],
  ["*", "8", "*", "7", "6", "5", "4"],
  ["*", "*", "*", "*", "*", "*", "1"],
  ["2", "3", "3", "3", "3", "2", "1"],
  ["0", "0", "0", "0", "0", "0", "0"],
];
const num_of_rows = board.length;
const num_of_cols = board[0].length;
let timer = null;
const mines = 16;
let hmtlBoard = null;
let initCancelTimer;


window.onload = function () {
  startGame();
document.getElementById("Mines_Screen").innerText="16";
document.getElementById("Timer_Screen").innerText="00";
};

function startTimer() {
  timer = document.getElementById("Timer_Screen");
  initCancelTimer = setInterval(incrementSeconds, 1000);
}


function startGame() {
  document.getElementById("board").appendChild(createTable());
  FillBoard();
}

function createTable() {
  var table, row, td, i, j;
  table = document.createElement("table");
  for (i = 0; i < num_of_rows; i++) {
    row = document.createElement("tr");
    for (j = 0; j < num_of_cols; j++) {
      td = document.createElement("td");
      td.classList.add("hidden")
      td.id = cellID(i, j);
      td.at = board[(i, j)];
      row.appendChild(td);
    }
    table.appendChild(row);
  }
  return table;
}

function FillBoard() {
  let cell, td;
  for (i = 0; i < num_of_rows; i++) {
    for (j = 0; j < num_of_cols; j++) {
      cell = document.getElementById(cellID(i, j));
      cell.classList.add(board[i][j]);
      //cell.innerText = board[i][j]; Can be uncemmented to see the board.
    }
  }
}

function cellID(i, j) {
  return "cell-" + i + "-" + j;
}

function incrementSeconds() {
  console.log(timer.innerText);
  timer.innerText = parseInt(timer.innerText) + 1;
}

//var cancel = setInterval(incrementSeconds, 1000);

function restartGame()
{
  document.getElementById("Mines_Screen").innerText="16";
  document.getElementById("Timer_Screen").innerText="00";
  clearInterval(initCancelTimer);
  initCancelTimer = null;
  FillBoard();
}