// Manage of the event listeners with click and right click, also desable the Context Menu
//window.addEventListener("contextmenu", (e) => e.preventDefault());
//window.addEventListener("contextmenu", (e) => leftClickEventHandler(e));

let cells = document.querySelectorAll("td");

cells.forEach((cell) =>
  cell.addEventListener("click", (event) => {
    idString = event.target.id.split("-");
    let cellX = idString[1];
    let cellY = idString[2];
    revealingACell(cellX, cellY);
  })
);

cells.forEach((cell) => cell.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    idString = event.target.id.split("-");
    let cellX = idString[1];
    let cellY = idString[2];
    putInterrogantOrFlag(cellX, cellY);
  })
);

cells.forEach((cell) => cell.addEventListener("click", (event) => {
  startTimer();
})
);
