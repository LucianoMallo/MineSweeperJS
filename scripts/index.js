let timer = null;
let initCancelTimer;
let mine_emoji = "&#x2600;";
let test = true; // if it's true loads an fixed board to run tests. On the testBoard.js can be created the board to test or use the one thats already exists
let game;
window.onload = function () {
  game = new MineSweeper(testBoard);
  document.getElementById("Mines_Screen").innerText = game.getMines();
  document.getElementById("Timer_Screen").innerText = "00";
  document.getElementById("board").appendChild(createTable(game.board));
  addClicksListeners(game);
  printOnHtml(game.board);
};

//Create a table on the html.
function createTable(board) {
  var table, row, td, i, j;
  table = document.createElement("table");
  for (i = 0; i < board.length; i++) {
    row = document.createElement("tr");
    for (j = 0; j < board[1].length; j++) {
      td = document.createElement("td");
      td.id = cellID(i, j);
      row.appendChild(td);
      td.classList.add("hidden");
    }
    table.appendChild(row);
  }
  return table;
}

// function that give an id to the based on the position on the grid.
function cellID(i, j) {
  return "cell-" + i + "-" + j;
}
function addClicksListeners() {
  let cells = document.querySelectorAll("td");
  cells.forEach((cell) =>
    cell.addEventListener("click", (event) => {
      idString = event.target.id.split("-");
      let cellX = idString[1];
      let cellY = idString[2];
      game.revealingACell(cellX, cellY);
    })
  );
  cells.forEach((cell) =>
    cell.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      idString = event.target.id.split("-");
      let cellX = idString[1];
      let cellY = idString[2];
      game.putInterrogantOrFlag(cellX, cellY);
    })
  );
}

function restartGame() {
  document.getElementById("Mines_Screen").innerText = "16";
  document.getElementById("Timer_Screen").innerText = "00";
  mines_counter = 16;
  clearInterval(initCancelTimer);
  initCancelTimer = null;
  board = [];
  fillBoardWithDefaultCell(board);
  puttingMines(board);
  getNumbersOfCells(board);
  win = false;
  cleanHTMLCells(board);
  printOnHtml(board);
}
function revealAdjacent(x, y) {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i < 0 || j < 0 || i >= board.length || j >= board[1].length) continue;

      let cell = board[i][j];

      if (cell.reveal) {
        continue;
      }

      revealingACell(i, j);
    }
  }
}
function startTimer() {
  if (initCancelTimer == null) {
    timer = document.getElementById("Timer_Screen");
    initCancelTimer = setInterval(incrementSeconds, 1000);
  }
}
function stopTimer() {
  clearInterval(initCancelTimer);
  //initCancelTimer = null;
}
function incrementSeconds() {
  timer.innerText = parseInt(timer.innerText) + 1;
}
function cleanHTMLCells(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[1].length; j++) {
      let htmlCell = document.getElementById(cellID(i, j));
      htmlCell.classList.add("hidden");
      htmlCell.classList.remove("number");
      htmlCell.classList.remove("mine");
      htmlCell.classList.remove("revealed");
      htmlCell.innerText == "";
    }
  }
}
function gameOver() {
  stopTimer();
  window.alert("Game Over Baby");
}
function winning() {
  stopTimer();
  window.alert("Okey you are a crack you win this");
}
function printOnHtml(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[1].length; j++) {
      let memoryCell = board[i][j];
      let htmlCell = document.getElementById(cellID(i, j));
      if (memoryCell.reveal) {
        if (memoryCell.containsMine) {
          if (memoryCell.tag != "question" || memoryCell.tag != "flagged") {
            htmlCell.innerHTML = mine_emoji;
            htmlCell.classList.remove("hidden");
            htmlCell.classList.add("mine");
            htmlCell.classList.add("revealed");
          }
        } else {
          if (memoryCell.tag != "question" || !memoryCell.tag != "flagged") {
            htmlCell.innerText = memoryCell.minesAdjacent;
            htmlCell.classList.remove("hidden");
            htmlCell.classList.add("number");
            htmlCell.classList.add("revealed");
          }
        }
      }
      if (memoryCell.tag == "question") {
        htmlCell.innerText = "?";
      }

      if (memoryCell.tag == "flagged") {
        htmlCell.innerText = "F";
      }
      if (memoryCell.tag == " " && !memoryCell.reveal) {
        htmlCell.innerText = "";
      }
    }
  }

  document.getElementById("Mines_Screen").innerText = game.getMines();
}
