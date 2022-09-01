Feature: Minesweeper

Background: 
    Given a user opens the app

Scenario: Default display screen
Then in the <timer_screen> should be shown a 000 
And in the <mines_screen> should be shown <number_of_mines>
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
Then the <box> changes to an image of a number that represents the number of <mine_boxs> around that <box>


Scenario: Putting a flag on a box
When the user click with the right click on a <box>
Then image of a red flag it's pose on the selected <box>
And the <number> of <mines_screen> reduce by 1




Scenario: Number box having a mine on the left box
When the user clicks on a <box>
And the <box> changes to a <number_box> 

Scenario: Number box having a mine on the right box
When the user clicks on a <box>
And the <box> changes to a <sum_number_of_mines_around>

Scenario: Number box having a mine on the up box
When the user clicks on a <box>-
And the <box> changes to a <sum_number_of_mines_around>

Scenario: Number box having a mine on the down box
When the user clicks on a <box>
And the <box> changes to a <sum_number_of_mines_around>

Scenario: Number box having a mine on the up-right box
When the user clicks on a <box>
And the <box> changes to a <sum_number_of_mines_around>

Scenario: Number box having a mine on the up-left box
When the user clicks on a <box>
And the <box> changes to a <sum_number_of_mines_around> 

Scenario: Number box having a mine on the down-right box
When the user clicks on a <box>
And the <box> changes to a <sum_number_of_mines_around> 

Scenario: Number box having a mine on the down-left box
When the user clicks on a <box>
And the <box> changes to a <sum_number_of_mines_around> 


Scenario: Number box having more than one mine around
When the user clicks on a <box>
And the <box> changes to a <sum_number_of_mines_around>


