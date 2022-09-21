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

window.onload = function () {
  startGame();
  startTimer();
};

function startTimer() {
  timer = document.getElementById("Timer_Screen");
  hmtlBoard = document.getElementById("board");
  hmtlBoard.addEventListener('click',test())
  //hmtlBoard.onclick(setInterval(incrementSeconds, 1000));
}

function test(){

    console.log("test");
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
      cell.innerText = board[i][j];
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
