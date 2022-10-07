const num_of_rows = testBoard.length;
const num_of_cols = testBoard[1].length;
let mines_counter = 8;
let timer = null;
let initCancelTimer;
let mine_emoji = "&#x2600;";
let win = false;
let started = false;
let test = true; // if it's true loads an fixed board to run tests. On the testBoard.js can be created the board to test or use the one thats already exists
let board = [];
let defaultCell = {
  containsMine: false,
  reveal: false,
  tag: " ",
  minesAdjacent: 0,
};

document.getElementById("Mines_Screen").innerText = mines_counter;
document.getElementById("Timer_Screen").innerText = "00";
appInit();

function appInit() {
  document.getElementById("board").appendChild(createTable());
  fillBoardWithDefaultCell(board);
}

function puttingMines(board) {
  if (!test) {
    puttingRandomMines(board);
  } else {
    putTestMines(board);
  }
}

function fillBoardWithDefaultCell() {
  for (let i = 0; i < num_of_rows; i++) {
    board[i] = [];
    for (let j = 0; j < num_of_cols; j++) {
      board[i].push({ ...defaultCell });
    }
  }
}

function fillBoardWithMineAndNumbers() {
  puttingMines(board);
  getNumbersOfCells(board);
}

function revealingACell(x, y) {
  let cell = board[x][y];
  if (!cell.reveal) {
    if (cell.tag == " ") {
      cell.reveal = true;

      if (!started) {
        started = true;
        fillBoardWithMineAndNumbers();
      }
      checkForAMine(x, y);
      if (cell.minesAdjacent == 0&&!cell.containsMine) {
        revealAdjacent(x, y);
      }
    }
    checkForWiningRevealingAllCells(board);
    printOnHtml(board);
  }
  if (win) {winning();}
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

function putInterrogantOrFlag(x, y) {
  let cell = board[x][y];
  if (cell.tag == "question" || cell.tag == "flagged") {
    if (cell.tag == "question") {
      cell.tag = " ";
      mines_counter += 1;
    }
    if (cell.tag == "flagged") {
      cell.tag = "question";
    }
  } else if (!cell.reveal) {
    cell.tag = "flagged";
    mines_counter -= 1;
    checkForWiningWithFlags(board);
  }
  printOnHtml(board);

  if (win) {
    winning();
  }
  
}

function checkForAMine(x, y) {
  let cell = board[x][y];
  if (cell.containsMine) {
    revealingMines(board);
    printOnHtml(board);
    gameOver();
  }
}

function revealingMines(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[1].length; j++) {
      if (board[i][j].containsMine) {
        board[i][j].reveal = true;
      }
    }
  }
}

function checkForWiningWithFlags(board) {
  for (i = 0; i < board.length; i++) {
    for (j = 0; j < board[1].length; j++) {
      let cell = board[i][j];
      if (cell.tag == "flagged" && cell.containsMine) {
        win = true;
      }
      if (cell.tag != "flagged" && cell.containsMine) {
        win = false;
        return;
      }
    }
  }
}
function checkForWiningRevealingAllCells(board) {
  console.log(win);
  for (i = 0; i < board.length; i++) {
    for (j = 0; j < board[1].length; j++) {
      let cell = board[i][j];
      if (!cell.reveal && !cell.containsMine) {
        win = false;
        return;
      } else {
        win = true;
      }
    }
  }
}

function puttingRandomMines(board) {
  let mineLayed = 0;
  while (mineLayed < mines_counter) {
    let cellRow = Math.floor(Math.random() * board.length);
    let cellCol = Math.floor(Math.random() * board[1].length);
    let cell = board[cellRow][cellCol];
    if (!cell.containsMine && !cell.reveal) {
      cell.containsMine = true;
      mineLayed++;
    }
  }
}
function putTestMines() {
  for (i = 0; i < board.length; i++) {
    for (j = 0; j < board[1].length; j++) {
      let cell = board[i][j];
      if (testBoard[i][j] == "mine") {
        cell.containsMine = true;
      }
    }
  }
}
function getNumbersOfCells(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[1].length; j++) {
      if (!board[i][j].containsMine) {
        board[i][j].minesAdjacent = getNumberOfACell(i, j);
      }
    }
  }
}

function getNumberOfACell(x, y) {
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
  return mines_ad;
}

function haveBomb(x, y) {
  if (x < 0 || x >= num_of_rows) {
    return false;
  }

  if (y < 0 || y >= num_of_cols) {
    return false;
  }
  if (board[x][y].containsMine) {
    return true;
  } else {
    return false;
  }
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

  document.getElementById("Mines_Screen").innerText = mines_counter;
}
