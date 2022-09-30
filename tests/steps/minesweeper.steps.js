const { Given, When, Then, DataTable } = require("@cucumber/cucumber");
const { expect, default: test } = require("@playwright/test");
const { split } = require("lodash");

const url = "http://127.0.0.1:5500/index.html"; //Local Tests
//const url = "https://lucianomallo.github.io/MineSweeperJS/" //Online Tests

Given("a user opens the app", async () => {
  await page.goto(url);
});

Given("the board is loaded with the value:", async (dataTable) => {
  let board = dataTable.rows();
  board = board.innerText;
  const field = await page.locator("data-testid=field");
  expect(board).toBe(field);
  //return true;
});

Then("in the timer screen should be shown a : {string}", async (string) => {
  const Timer_Screen = await page
    .locator("data-testid=Timer_Screen")
    .innerText();
  expect(Timer_Screen).toBe(string);
});

Then("in the mines screen should be shown a : {string}", async (string) => {
  const Mines_Screen = await page
    .locator("data-testid=Mines_Screen")
    .innerText();
  expect(Mines_Screen).toBe(string);
});

Then("all cell should be unrevealed", async () => {
  const cell = await page.locator("id=cell-0-0");
  await expect(cell).toHaveClass(/hidden/);
});

When("the user hits the <emoji_button>", async () => {
  await page.locator("data-testid=Emoji").click();
});

When("the user puts a flag on : {string}", async (string) => {
  await page.locator("id=cell-" + string).click({ button: "right" });
});

Then("the box {string} shows a flag", async (string) => {
  const cell = await page.locator("id=cell-" + string + "");
  await expect(cell).toHaveClass(/flagged/);
});

When("the user puts a question mark on : {string}", async (string) => {
  await page.locator("id=cell-" + string).click({ button: "right" });
  await page.locator("id=cell-" + string).click({ button: "right" });
});

Then("the box {string} shows a question mark", async (string) => {
  const cell = await page.locator("id=cell-" + string + "");
  await expect(cell).toHaveClass(/question/);
});

When("the user removes a question mark on : {string}", async (string) => {
  await page.locator("id=cell-" + string).click({ button: "right" });
  await page.locator("id=cell-" + string).click({ button: "right" });
  await page.locator("id=cell-" + string).click({ button: "right" });
});

Then("the box {string} should not show nothing", async (string) => {
  const cell = await page.locator("id=cell-" + string + "");
  await expect(cell).not.toHaveClass(/question/);
  await expect(cell).not.toContainText('?');

});

When("the user removes a flag on : {string}", async (string) => {
  await page.locator("id=cell-" + string).click({ button: "right" });
  await page.locator("id=cell-" + string).click({ button: "right" });
});

Then("the box {string} should shows a question mark", async (string) => {
  const cell = await page.locator("id=cell-" + string + "");
  await expect(cell).toHaveClass(/question/);
});

When('the user reveal the box {string}', async (string)=> {
  await page.locator("id=cell-" + string + "").click();
});

Then("the box {string} should show its content", async (string) => {
  const cell = await page.locator("id=cell-" + string + "");
  await expect(cell).toHaveClass(/revealed/);
});

Then("the box {string} should show a mine", async (string) => {
  const cell = await page.locator("id=cell-" + string + "");
  await expect(cell).toContainText('*');
});

Then("the display shows a game over message", async () => {
    await page.on("dialog", async (dialog) => {
      await expect(dialog.message()).toContain('Game Over Baby')
      await page.click("#alert-button");
  });
});

Then('the {string} displays *', async (string)=> {
  const cell = await page.locator("id=cell-" + string + "");
  await expect(cell).toContainText('*');
});

Then('the {string} should show the following value: {string}', async (string, string2)=> {
  const cell = await page.locator("id=cell-" + string + "").innerText();
  await expect(cell).toBe(string2);
});