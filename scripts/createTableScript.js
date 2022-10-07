//Create a table on the html.
function createTable() {
    var table, row, td, i, j;
    table = document.createElement("table");
    for (i = 0; i < num_of_rows; i++) {
      row = document.createElement("tr");
      for (j = 0; j < num_of_cols; j++) {
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