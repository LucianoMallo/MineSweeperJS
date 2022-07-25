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

Scenario: Clicking on the first box
When the user click on a <box>
Then the <timer_screen> start a count with the seconds passed

Scenario: Clicking on an box
When the user click on a <box>
Then the <box> changes the form

Scenario: Clicking on an box with a mine
When the user click on a <box>
Then the <box> changes to an image of a bomb
And the timer on the <timer_screen> stops
And all the <mine_boxs> changes to an image of a bomb
And all botton are disable excepts the <emoji_button>

Scenario: Clicking emoji button
When the user click on a <emoji_button>
Then the Default display screen is shown

Scenario: Clicking on an box without a mine
When the user click on a <box>
Then the <box> changes to an image of a numer that represents the number of <mine_boxs> around that <box>

Scenario: Clicking on an box without a mine
When the user click on a <box>
Then the <box> changes to a <number_box>

Scenario: Putting a flag on a box
When the user click with the right click on a <box>
Then image of a red flag it's pose on the selected <box>

Scenario: Number box having a mine the left
When the user clicks on a <box>
And the <box> changes to a <number_box> 