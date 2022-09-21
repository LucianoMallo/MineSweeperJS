const { Given, When, Then, DataTable } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { split } = require("lodash");

const url = "http://127.0.0.1:5500/index.html";

Given("a user opens the app", async () => {
  await page.goto(url);
});

Given("the board is loaded with the value:", async (dataTable) => {
  //let board = dataTable.rows();
  //const field = await page.locator("data-testid=field");
  //expect(board).toBe(field);
  return true;
});

Then("in the timer screen should be shown a : {string}", async (string) => {
  const Timer_Screen = await page.locator("data-testid=Timer_Screen").innerText();
  expect(Timer_Screen).toBe(string);
});

Then("in the mines screen should be shown a : {string}", async (string) => { 
  const Mines_Screen = await page.locator("data-testid=Mines_Screen").innerText();
  expect(Mines_Screen).toBe(string);
});

Then("no boxes should be marked", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

