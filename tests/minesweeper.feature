Feature: Minesweeper

    '
    Not open boxs: "hidden"
    Mines: "*"
    Clear_box: "0"
    box with Flag: "flagged"
    question mark: "question"
    Numbers: <adjacent_mines>
    <board_to_test>:
       0 1 2 3 4 5 6
    ---------------
    0| * * * * * * *|
    1| * 8 * 7 6 5 3|
    2| * * * * * * 1|
    3| 2 4 * 4 3 2 1|
    4| 0 1 1 1 0 0 0|
    5| 0 0 0 0 0 0 0|
    '
    
    Background:
        Given a user opens the app

    @done
    Scenario: Default display screen, reseting the timer.
        Then in the timer screen should be shown a : "00"
    @done
    Scenario: Default display screen, reseting the mines

        Then in the mines screen should be shown a : "16"
    @toBeDone
    Scenario: Default display screen, reseting the boxes
        And no boxes should be marked
    @done
    Scenario: hitting emoji button
        When the user hits the <emoji_button>
        Then in the timer screen should be shown a : "00"
        And in the mines screen should be shown a : "16"
        And all cell should be unrevealed

    @manual
    Scenario: starting the counter
        When the user reveal the "5-4" box
        Then the <timer_screen> start a count with the seconds passed

    @done
    Scenario: Putting a flag on a box with suspected mine
        When the user puts a flag on : "0-0"
        Then the box "0-0" shows a flag
        And in the mines screen should be shown a : "15"
    @done
    Scenario: Putting a question mark on a box
        When the user puts a question mark on : "0-0"
        Then the box "0-0" should shows a question mark
        And in the mines screen should be shown a : "15"

    @done
    Scenario: Removing a question mark on a box
        When the user removes a question mark on : "0-0"
        Then the box "0-0" should not show nothing
        And in the mines screen should be shown a : "16"
    @done
    Scenario: Removing a flag on a box, by putting a question mark instead
        When the user removes a flag on : "0-0"
        Then the box "0-0" should shows a question mark
        And in the mines screen should be shown a : "15"

    @done
    Scenario: Revealing a box
        When the user reveal the box "1-1"
        Then the box "1-1" should show :"8"
    @done
    Scenario: Revealing a box with a mine
        When the user reveal the box "0-0"
        Then the box "0-0" should show a mine
    @done
    Scenario: Losing the game
        When the user reveal the box "0-0"
        Then the display shows a game over message
    @done
    Scenario Outline: Revealing a box with a mine and reveal all mines
        When the user reveal the box <box>
        Then the box <box> should show a mine

        Examples:
            | box   |
            | '0-0' |
            | '0-1' | 
            | '0-2' |
            | '0-3' |
            | '0-4' |
            | '0-5' |
            | '0-6' |
            | '1-0' |
            | '2-1' |
            | '2-0' |
            | '2-1' |
            | '2-2' |
            | '2-3' |
            | '2-4' |
            | '2-5' |

     @done
    Scenario Outline: Reavealing a box without a mine, showing the number of adjacent mines
        When the user reveal the box <box>
        Then the <box> should show the following value: <adjacent_mines>
        
        Examples:
            |  box  | adjacent_mines   |
            | '1-1' | '8'              |
            | '1-3' | '7'              |
            | '1-4' | '6'              |
            | '1-5' | '5'              |
            | '3-1' | '4'              |
            | '1-6' | '3'              |
            | '3-0' | '2'              |
            | '3-6' | '1'              |
            | '4-0' | '0'              |

    @done
    Scenario: Winning by putting a flag on all box with a mine
        When the user puts a flag on : "0-0"
        And the user puts a flag on : "0-1"
        And the user puts a flag on : "0-2"
        And the user puts a flag on : "0-3"
        And the user puts a flag on : "0-4"
        And the user puts a flag on : "0-5"
        And the user puts a flag on : "0-6"
        And the user puts a flag on : "1-0"
        And the user puts a flag on : "1-2"
        And the user puts a flag on : "2-0"
        And the user puts a flag on : "2-1"
        And the user puts a flag on : "2-2"
        And the user puts a flag on : "2-3"
        And the user puts a flag on : "2-4"
        And the user puts a flag on : "2-5"
        And the user puts a flag on : "3-2"
        Then the displays shows a winning message
        And in the mines screen should be shown a : "0"

    @done
    Scenario Outline: Winning by reavealing all boxes without a mine
        When the user reveal the box "1-1"
        And the user reveal the box "1-3"
        And the user reveal the box "1-4"
        And the user reveal the box "1-5"
        And the user reveal the box "1-5"
        And the user reveal the box "1-6"
        And the user reveal the box "2-6"
        And the user reveal the box "3-0"
        And the user reveal the box "3-1"
        And the user reveal the box "3-3"
        And the user reveal the box "3-4"
        And the user reveal the box "3-5"
        And the user reveal the box "3-6"
        And the user reveal the box "4-0"
        And the user reveal the box "4-1"
        And the user reveal the box "4-2"
        And the user reveal the box "4-3"
        And the user reveal the box "4-4"
        And the user reveal the box "4-5"
        And the user reveal the box "4-6"
        And the user reveal the box "5-0"
        And the user reveal the box "5-1"
        And the user reveal the box "5-2"
        And the user reveal the box "5-3"
        And the user reveal the box "5-4"
        And the user reveal the box "5-5"
        And the user reveal the box "5-6"

        Then the displays shows a winning message

    @done
    Scenario Outline: Reavealing a cell with no adjacent mines
        When the user reveal the box "4-0"
        Then the box "4-0" should show its content
        And the box "4-1" should show its content
        And the box "3-0" should show its content
        And the box "3-1" should show its content
        And the box "5-0" should show its content
        And the box "5-1" should show its content
      
    @done
    Scenario: Reavealing a cell with no mine around - Revealing surrounding cells (recursively)
        When the user reveal the box "4-0"
       Then the box "4-0" should show its content
        And the box "4-1" should show its content
        And the box "4-2" should show its content
        And the box "4-3" should show its content
        And the box "4-4" should show its content
        And the box "4-5" should show its content
        And the box "4-6" should show its content
        And the box "3-0" should show its content
        And the box "3-1" should show its content
        And the box "3-3" should show its content
        And the box "3-4" should show its content
        And the box "3-5" should show its content
        And the box "3-6" should show its content
        And the box "5-0" should show its content
        And the box "5-1" should show its content
        And the box "5-2" should show its content
        And the box "5-3" should show its content
        And the box "5-4" should show its content
        And the box "5-5" should show its content
        And the box "5-6" should show its content
