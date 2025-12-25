"use strict";

function player(sign) {
    return {sign};
}

// IIFE: The anonymous function creates one board object immediately
const gameboard = (
    function() {
        const board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];

        const setBoardValue = (pos, val) => {
            if(pos > 8) {
                return 1;
            }
            const row = Math.floor(pos/3);
            const col = pos%3;
            // Check if cell is already filled
            if(board[row][col] != "") {
                return 2;
            }
            else {
                board[row][col] = val;
                return 0;
            }
        }

        const getBoard = () => {
            console.log(
                `${board[0][0]}|${board[0][1]}|${board[0][2]}\n${board[1][0]}|${board[1][1]}|${board[1][2]}\n${board[2][0]}|${board[2][1]}|${board[2][2]}`
            );
        };
        return {board, setBoardValue, getBoard};
    }
)(); // Board IIFE ends here

function game() {
    const player1 = player("x");
    const player2 = player("O");

    // Function to check End Conditions
    const checkEnd = function() {
        const board = gameboard.board;
        // Case 1: Player 1 wins
        if(
            (board[0][0] == player1.sign && board[0][1] == player1.sign && board[0][2] == player1.sign) ||
            (board[1][0] == player1.sign && board[1][1] == player1.sign && board[1][2] == player1.sign) ||
            (board[2][0] == player1.sign && board[2][1] == player1.sign && board[2][2] == player1.sign) ||
            (board[0][0] == player1.sign && board[1][0] == player1.sign && board[2][0] == player1.sign) ||
            (board[0][1] == player1.sign && board[1][1] == player1.sign && board[2][1] == player1.sign) ||
            (board[0][2] == player1.sign && board[1][2] == player1.sign && board[2][2] == player1.sign) ||
            (board[0][0] == player1.sign && board[1][1] == player1.sign && board[2][2] == player1.sign) ||
            (board[0][2] == player1.sign && board[1][1] == player1.sign && board[2][0] == player1.sign)
        ) {
            console.log("Player 1 wins!");
            return 1;
        } 
        // Case 2: Player 2 wins
        else if(
            (board[0][0] == player2.sign && board[0][1] == player2.sign && board[0][2] == player2.sign) ||
            (board[1][0] == player2.sign && board[1][1] == player2.sign && board[1][2] == player2.sign) ||
            (board[2][0] == player2.sign && board[2][1] == player2.sign && board[2][2] == player2.sign) ||
            (board[0][0] == player2.sign && board[1][0] == player2.sign && board[2][0] == player2.sign) ||
            (board[0][1] == player2.sign && board[1][1] == player2.sign && board[2][1] == player2.sign) ||
            (board[0][2] == player2.sign && board[1][2] == player2.sign && board[2][2] == player2.sign) ||
            (board[0][0] == player2.sign && board[1][1] == player2.sign && board[2][2] == player2.sign) ||
            (board[0][2] == player2.sign && board[1][1] == player2.sign && board[2][0] == player2.sign)
        ) {
            console.log("Player 2 wins!");
            return 2;
        }
        // Case 3: It's a draw if no cell is empty
        else if(!(board[0].includes("") || board[1].includes("") || board[2].includes(""))) {
            console.log("It's a draw");
            return 3;
        }
        // Case 4: Game goes on
        else {
            return 0;
        }
    }

    const runGame = () => {
        gameboard.setBoardValue(0, player1.sign);
        checkEnd();
        gameboard.getBoard();
        gameboard.setBoardValue(1, player2.sign);
        checkEnd();
        gameboard.getBoard();
        gameboard.setBoardValue(2, player1.sign);
        checkEnd();
        gameboard.getBoard();
        gameboard.setBoardValue(3, player2.sign);
        checkEnd();
        gameboard.getBoard();
        gameboard.setBoardValue(4, player1.sign);
        checkEnd();
        gameboard.getBoard();
        gameboard.setBoardValue(5, player2.sign);
        checkEnd();
        gameboard.getBoard();
        gameboard.setBoardValue(7, player1.sign);
        checkEnd();
        gameboard.getBoard();
        gameboard.setBoardValue(6, player2.sign);
        checkEnd();
        gameboard.getBoard();
        gameboard.setBoardValue(8, player2.sign);
        checkEnd();
        gameboard.getBoard();

    }
    return {runGame};
}

// IIFE: A single display controllers handles I/O stuff
const displayController = (
    function() {
        const cells = document.querySelectorAll(".cell");

        // In this factory function, we attach the 'click' event to each
        // cell of the board
        for(let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', function() {
            cells[i].textContent = "L";
            })
        }

        const renderBoard = () => {
            const board = [
                        ["x", "0", "x"],
                        ["0", "0", "x"],
                        ["0", "x", "0"]
                    ];
            for(let i = 0; i < cells.length; i++) {
                cells[i].textContent = board[Math.floor(i/3)][i%3];
            }
        }

        // When we return the object, the cells corresponding to the Display Controller object
        // will update their values on click
        return {renderBoard};
    }
)();

const g = game();
g.runGame();

displayController.renderBoard();