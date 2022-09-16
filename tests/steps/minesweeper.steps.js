const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { split } = require("lodash");

const url = "http://127.0.0.1:5500/";

Given("a user opens the app", async () => {
  await page.goto(url);
});

Given("the board is loaded with the value: {string}", function (table) {
  let board = table.rows().split(" ");
  console.log(board);
  display = [
    ["*", "*", "*", "*", "*", "*", "*"],
    ["*", "8", "*", "7", "6", "5", "4"],
    ["*", "*", "*", "*", "*", "*", "1"],
    ["2", "3", "3", "3", "3", "2", "1"],
    ["0", "0", "0", "0", "0", "0", "0"],
  ];
  expect(board).toBe(display);
});

/*
     a b c d e f g
   |---------------
  1| * * * * * * *|
  2| * 8 * 7 6 5 4|
  3| * * * * * * 1|
  4| 2 3 3 3 3 2 1|
  5| 0 0 0 0 0 0 0|
*/
