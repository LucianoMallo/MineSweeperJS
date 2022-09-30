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
        Then the box "0-0" shows a question mark
        And in the mines screen should be shown a : "15"

    @done
    Scenario: Removing a question mark on a box
        When the user removes a question mark on : "0-0"
        Then the box "0-0" should not show nothing
        And in the mines screen should be shown a : "16"
    @done
    Scenario: Removing a flag on a box, by putting a question mark instead
        When the user removes a flag on : "0-0"
        Then the box "0-0" should show a question mark
        And in the mines screen should be shown a : "15"

    @done
    Scenario: Revealing a box
        When the user reveal the box "0-0"
        Then the box "0-0" should show its content
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
        When the user reveal the box "0-0"
        Then the <box> displays <display>

        Examples:
            | box   | display |
            | '0-0' | *       |
            | '0-1' | *       |
            | '0-2' | *       |
            | '0-3' | *       |
            | '0-4' | *       |
            | '0-5' | *       |
            | '0-6' | *       |
            | '1-0' | *       |
            | '2-1' | *       |
            | '2-0' | *       |
            | '2-1' | *       |
            | '2-2' | *       |
            | '2-3' | *       |
            | '2-4' | *       |
            | '2-5' | *       |

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

    @wip
    Scenario: Winning by putting a flag on all box with a mine
        Given the user put a flag on : "0-0"
        And the user put a flag on : "0-1"
        And the user put a flag on : "0-2"
        And the user put a flag on : "0-3"
        And the user put a flag on : "0-4"
        And the user put a flag on : "0-5"
        And the user put a flag on : "0-6"
        And the user put a flag on : "1-0"
        And the user put a flag on : "1-2"
        And the user put a flag on : "2-1"
        And the user put a flag on : "2-2"
        And the user put a flag on : "2-3"
        And the user put a flag on : "2-4"
        And the user put a flag on : "2-5"
        And the user put a flag on : "3-2"
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

    Scenario Outline: Reavealing a cell with no adjacent mines
        When the user reveal the "4-2" box
        Then the "4-2" be reveal
        And the "4-1" be reveal
        And the "3-1" be reveal
        And the "3-2" be reveal
        And the "3-3" be reveal
        And the "4-3" be reveal

    Scenario: Reavealing a cell with no mine around - Revealing surrounding cells (recursively)
        When the user reveal the "d8" box
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