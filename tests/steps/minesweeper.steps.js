const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url="";

Given('a user opens the app', async () => {
	await page.goto(url);
});

Given('the board is loaded with the value: {string}', function (string ) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });

When('the user Reveal a cell', function () {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
          });