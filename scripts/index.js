let timer = null;
let initCancelTimer;
let mine_emoji = "&#x2600;";
let flag_emoji=	"🚩";
let game;
let testing = false;//change to true to test the functions with a fixed board. 

var ms = null;
if (testing) {
  game = new MineSweeper(testBoard);
} else {
  game = new MineSweeper();
}

window.onload = function () {
  document.getElementById("Mines_Screen").innerText = game.getMines();
  document.getElementById("Timer_Screen").innerText = "00";
  document.getElementById("board").appendChild(createTable());
};

//Create a table on the html.
function createTable() {
  var table, row, td, i, j;
  table = document.createElement("table");
  for (let i = 0; i < game.num_of_rows; i++) {
    row = document.createElement("tr");
    for (let j = 0; j < game.num_of_cols; j++) {
      td = document.createElement("td");
      td.id = cellID(i, j);
      row.appendChild(td);
      addClicksListeners(td, i, j);
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
function addClicksListeners(td, i, j) {
  
  td.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  td.addEventListener("mousedown", function (event) {
    if (!game.board[i][j].reveal) {
      switch (event.which) {
        case 1:
          game.revealingACell(i, j);
          break;

        case 3:
          game.putInterrogantOrFlag(i, j);
          break;

        default:
          break;
      }
    }
    startTimer()
    printOnHtml();
    checkWinningOrLost();
  });
}

function restartGame() {
  if (testing) {
    game = new MineSweeper(testBoard);
  } else {
    game = new MineSweeper();
  }
  document.getElementById("Mines_Screen").innerText = game.getMines();
  document.getElementById("Timer_Screen").innerText = "00";
  document.getElementById("board");
  clearInterval(initCancelTimer);
  initCancelTimer = null;
  cleanHTMLCells();
  printOnHtml();
}

function startTimer() {
  if (initCancelTimer == null) {
    timer = document.getElementById("Timer_Screen");
    initCancelTimer = setInterval(incrementSeconds, 1000);
  }
}
function stopTimer() {
  clearInterval(initCancelTimer);
  initCancelTimer = null;
}
function incrementSeconds() {
  timer.innerText = parseInt(timer.innerText) + 1;
}
function cleanHTMLCells() {
  for (let i = 0; i < game.board.length; i++) {
    for (let j = 0; j < game.board[1].length; j++) {
      let htmlCell = document.getElementById(cellID(i, j));
      if (htmlCell.classList.contains("revealed"))
        htmlCell.classList.add("hidden");
      htmlCell.classList.remove("number");
      htmlCell.classList.remove("mine");
      htmlCell.classList.remove("revealed");
      htmlCell.innerText = "";
      htmlCell.innerHTML = "";
    }
  }
}

function checkWinningOrLost() {
  switch (game.getGameState()) {
      case "lost":
          gameOver();
          break
      case "win":
         winning();
          break
      default:
          break
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
function printOnHtml() {
  for (let i = 0; i < game.board.length; i++) {
    for (let j = 0; j < game.board[1].length; j++) {
      let memoryCell = game.board[i][j];
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
        htmlCell.innerText = flag_emoji;
      }
      if (memoryCell.tag == " " && !memoryCell.reveal) {
        htmlCell.innerText = "";
      }
    }
  }

  document.getElementById("Mines_Screen").innerText = game.getMines();
  
}
