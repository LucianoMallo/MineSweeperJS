Feature: Minesweeper

Background: 
    Given a user opens the app

Scenario: Default display screen
Then in the <timer_screen> and <mines_screen> should be show a 000
And no square should be marked
And all buttons should be enabled

Scenario: Clicking on timer screen and mines screen
When user clicks on the timer or mines screen
Then nothing happens

Scenario: Clicking on an square
When the user click on a <box>
Then the <box> changes the form

Scenario: Clicking on an square with a mine
When the user click on a <box>
Then the <box> changes to an image of a bomb
And the timer on the <timer_screen> stops
And all the <mine_box> changes to an image of a bomb

Scenario: Clicking on an square without a mine
When the user click on a <box>
Then the <box> changes to an image of a numer that represents the number of mines around that <box>

