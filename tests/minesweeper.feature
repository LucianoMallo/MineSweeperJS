Feature: Minesweeper

    '
    Not open boxs: "hidden"
    Mines: "*"
    Clear_box: "0"
    box with Flag: "flagged"
    question mark: "question"
    Numbers: <sum_number_of_mines_around>
    <board_to_test>:
       0 1 2 3 4 5 6
    ---------------
    0| * * * * * * *|
    1| * 8 * 7 6 5 4|
    2| * * * * * * 1|
    3| 2 3 3 3 3 2 1|
    4| 0 0 0 0 0 0 0|
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
    @wip
    Scenario Outline: Revealing a box with a mine and reveal all mines
        When the user reveal the box "0-0"
        Then the <box> displays <display>

        Examples:
            | box    | display |
            | '0-0'  |    *    |
            | '0-1'  |    *    |
            | '0-2'  |    *    |
            | '0-3'  |    *    |
            | '0-4'  |    *    |
            | '0-5'  |    *    |
            | '0-6'  |    *    |
            | '1-0'  |    *    |
            | '2-1'  |    *    |
            | '2-0'  |    *    |
            | '2-1'  |    *    |
            | '2-2'  |    *    |
            | '2-3'  |    *    |
            | '2-4'  |    *    |
            | '2-5'  |    *    |


    Scenario Outline: Reavealing a box without a mine, showing the number of the mines around
        When the user reveal the <box>
        And the <box> should show <sum_number_of_mines_around>

            | box | sum_number_of_mines_around |
            | b2  | 8                          |
            | d2  | 7                          |
            | e2  | 6                          |
            | f2  | 5                          |
            | g2  | 4                          |
            | b4  | 3                          |
            | f4  | 2                          |
            | g3  | 1                          |
            | g5  | 0                          |


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