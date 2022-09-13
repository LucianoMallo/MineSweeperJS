Feature: Minesweeper


Not open boxs: "-"
Mines: "*"
Clear_box: "0"
box with Flag: "F"
question mark: "?"
Numbers: <sum_number_of_mines_around>
board_to_test    a b c d e f g
               ---------------
              1| * * * * * * *|
              2| * 8 * 7 6 5 4|
              3| * * * * * * 1| 
              4| 2 3 3 3 3 2 1|
              5| 0 0 0 0 0 0 0|


Background: 
    Given a user opens the app
    Given the board    
              

Scenario Outline: Revealing a box with a mine
Given the board is loaded with the value: "<board_to_test>"
When the user Reveal the box "a1"
Then the display shows a game over message

Scenario Outline: Revealing a box with a mine and reveal all mines
Given the board is loaded with the value: "<board_to_test>"
When the user Reveal a <box>
Then the <box> displays <display> 

Examples:
| box | display |
| a1  |    *    |
| b1  |    *    |
| c1  |    *    |
| d1  |    *    |
| e1  |    *    |
| f1  |    *    |
| g1  |    *    |
| a2  |    *    |
| c2  |    *    |
| a3  |    *    |
| b3  |    *    |
| c3  |    *    |
| d3  |    *    |
| e3  |    *    |
| f3  |    *    |


Scenario Outline: Reavealing a box without a mine, showing the number of the mines around
When the user reveal the <box>
And the <box> should show <sum_number_of_mines_around>

| box |sum_number_of_mines_around|
|  b2 |         8                |
|  d2 |         7                |
|  e2 |         6                |
|  f2 |         5                |
|  g2 |         4                |
|  b4 |         3                |
|  g3 |         1                |
|  g5 |         0                |

Scenario: Putting a flag on a box with suspected mine
When the user puts a flag on : "a1"
Then the box "a1" shows "F"
And the number on the <mines_screen> reduce by "1"

Scenario: Removing a flag on a box
When the user remove on : "a1"
Then the box "a1" shows "-"
And the number on the <mines_screen> increase by "1"

Scenario: Putting a question mark on a box 
When the user puts a flag on : "a1"
Then the box "a1" shows "?"
And the number on the <mines_screen> reduce by "1"

Scenario: Removing a question mark on a box
When the user puts a flag on : "a1"
Then the box "a1" shows "-"
And the number on the <mines_screen> reduce by "1"

Scenario: Winning by putting a flag on all box with a mine
Given the user put a flag on : "a1"
And the user put a flag on : "b1"
And the user put a flag on : "c1"
And the user put a flag on : "d1"
And the user put a flag on : "e1"
And the user put a flag on : "f1"
And the user put a flag on : "g1"
And the user put a flag on : "a2"
And the user put a flag on : "c2"
And the user put a flag on : "a3"
And the user put a flag on : "b3"
And the user put a flag on : "c3"
And the user put a flag on : "d3"
And the user put a flag on : "e3"
And the user put a flag on : "f3"
Then the displays shows a winning message
And the number on the <mines_screen> should show value: "0"

Scenario Outline: Winning by reavealing all boxes without a mine
When the user reveal the "b2"
And the user reveal the "d2"
And the user reveal the "e2"
And the user reveal the "f2"
And the user reveal the "g2"
And the user reveal the "g3"
And the user reveal the "a4"
And the user reveal the "b4"
And the user reveal the "c4"
And the user reveal the "d4"
And the user reveal the "e4"
And the user reveal the "f4"
And the user reveal the "g4"
And the user reveal the "a5"
And the user reveal the "b5"
And the user reveal the "c5"
And the user reveal the "d5"
And the user reveal the "e5"
And the user reveal the "f5"
And the user reveal the "g5"
Then the displays shows a winning message


Scenario: Revealing a box without a mine around
When the user click the "right click" on "d8" box
Then the box "g5" opens
And the box "f5" opens
And the box "e5" opens
And the box "d5" opens
And the box "c5" opens
And the box "b5" opens
And the box "a5" opens
And the box "g4" opens
And the box "f4" opens
And the box "e4" opens
And the box "d4" opens
And the box "c4" opens
And the box "b4" opens
And the box "a4" opens

Scenario: Clicking emoji button
When the user click on a <emoji_button>
Then in the timer screen should be shown a 000 
And in the mines screen should be shown <number_of_mines>
And no box should be marked
And all buttons should be enabled

Scenario: Clicking on timer screen and mines screen
When the user clicks on the timer or mines screen
Then nothing happens

Scenario: starting the counter
When the user Reveal a "g5"
Then the <timer_screen> start a count with the seconds passed

Scenario: Default display screen
Then in the timer screen should be shown a "000" 
And in the mines screen should be shown "10"
And no square should be marked
And all buttons should be enabled