const { Given, When, Then, DataTable } = require("@cucumber/cucumber");
const { expect, default: test } = require("@playwright/test");
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

Then("all cell should be unrevealed", async () =>{
  const cell = await page.locator("id=cell-0-0");
  await expect(cell).toHaveClass(/hidden/);
});

When('the user hits the <emoji_button>', async ()=> {
  await page.locator("data-testid=Emoji").click();
});