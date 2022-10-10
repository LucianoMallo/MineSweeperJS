const defaultCell = {
  containsMine: false,
  reveal: false,
  tag: " ",
  minesAdjacent: 0,
};

class MineSweeper {
  constructor(board = this.CreateBoard()) {
    this.board = JSON.parse(JSON.stringify(board));
    this.num_of_rows = this.board.length;
    this.num_of_cols = this.board[1].length;
    this.mines = this.countMines();
    this.gameState = null;
    this.getNumbersOfCells();
  }

getNum_of_rows(){
    return this.num_of_rows
}
getNum_of_cols(){
    return this.num_of_cols
}

  getMines() {
    return this.mines;
  }
  getGameState() {
    return this.gameState;
  }
 

  countMines() {
    let mines = 0;
    for (let i = 0; i < this.num_of_rows; i++) {
      for (let j = 0; j < this.num_of_cols; j++) {
        if (this.board[i][j].containsMine) {
          mines++;
        }

        if (this.board[i][j].tag != " ") {
          mines--;
        }
      }
    }
    return mines;
  }
  CreateBoard(rows=8, cols=8, mines=10) {
    let board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        board[i].push({ ...defaultCell });
      }
    }

    let mineLayed = 0;
    while (mineLayed < mines) {
      let cellRow = Math.floor(Math.random() * rows);
      let cellCol = Math.floor(Math.random() * cols);

      if (!board[cellRow][cellCol].containsMine) {
        board[cellRow][cellCol].containsMine = true;
        mineLayed++;
      }
    }
    return board;
  }

  getNumbersOfCells() {
    for (let i = 0; i < this.num_of_rows; i++) {
      for (let j = 0; j < this.num_of_cols; j++) {
        if (!this.board[i][j].containsMine) {
          this.board[i][j].minesAdjacent = this.getNumberOfACell(i, j);
        }
      }
    }
  }

  getNumberOfACell(x, y) {
    let mines_ad = 0;
    if (this.haveBomb(x - 1, y)) {
      mines_ad++;
    } //middle left
    if (this.haveBomb(x - 1, y - 1)) {
      mines_ad++;
    } //upper left
    if (this.haveBomb(x, y - 1)) {
      mines_ad++;
    } //upper center
    if (this.haveBomb(x + 1, y - 1)) {
      mines_ad++;
    } //upper right
    if (this.haveBomb(x + 1, y)) {
      mines_ad++;
    } //middle right
    if (this.haveBomb(x + 1, y + 1)) {
      mines_ad++;
    } //down right
    if (this.haveBomb(x, y + 1)) {
      mines_ad++;
    } //down center
    if (this.haveBomb(x - 1, y + 1)) {
      mines_ad++;
    } //down left
    return mines_ad;
  }

  haveBomb(x, y) {
    if (x < 0 || x >= this.num_of_rows) {
      return false;
    }

    if (y < 0 || y >= this.num_of_cols) {
      return false;
    }
    if (this.board[x][y].containsMine) {
      return true;
    } else {
      return false;
    }
  }

  revealingACell(x, y) {
    let cell = this.board[x][y];
    if (!cell.reveal) {
      if (cell.tag == " ") {
        cell.reveal = true;
        this.checkForAMine(x, y);
        if (cell.minesAdjacent == 0 && !cell.containsMine) {
            this.revealAdjacent(x, y);
        }
      }
      this.checkForWiningRevealingAllCells();
    }
  }
  revealAdjacent(x, y) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i < 0 || j < 0 || i >= this.num_of_rows || j >= this.num_of_cols) continue;
  
        
  
        if (this.board[i][j].reveal) {
          continue;
        }
  
        this.revealingACell(i, j);
      }
    }
  }

  checkForAMine(x, y) {
    if (this.board[x][y].containsMine) {
        this.revealingMines();
      this.gameState = "lost";
    }
  }

  revealingMines() {
    for (let i = 0; i < this.num_of_rows; i++) {
      for (let j = 0; j < this.num_of_cols; j++) {
        if (this.board[i][j].containsMine) {
          this.board[i][j].reveal = true;
        }
      }
    }
  }

  putInterrogantOrFlag(x, y) {
    let cell = this.board[x][y];
    if (cell.tag == "question" || cell.tag == "flagged") {
      if (cell.tag == "question") {
        cell.tag = " ";
      }
      if (cell.tag == "flagged") {
        cell.tag = "question";
      }
    } else if (!cell.reveal) {
      cell.tag = "flagged";
    }
    this.countMines();
    this.checkForWiningWithFlags();
  }

  checkForWiningWithFlags() {
    for (let i = 0; i < this.num_of_rows; i++) {
      for (let j = 0; j < this.num_of_cols; j++) {
        let cell = this.board[i][j];
        if (cell.tag == "flagged" && cell.containsMine) {
          this.gameState = "win";
        }
        if (cell.tag != "flagged" && cell.containsMine) {
          this.gameState = null;
          return;
        }
      }
    }
  }
  checkForWiningRevealingAllCells() {
    for (let i = 0; i < this.num_of_rows; i++) {
      for (let j = 0; j < this.num_of_cols; j++) {
        let cell = this.board[i][j];
        if (!cell.reveal && !cell.containsMine) {
          this.gameState = null;
          return;
        } else {
            this.gameState = "win";
        }
      }
    }
  }
}
