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
            const row = Math.floor(pos/3);
            const col = pos%3;
            // Check if cell is already filled
            if(board[row][col] != "") {
                console.log(`Cell ${pos} is already filled!`);
                return 1;
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
    const playerX = player("x");
    const playerO = player("O");

    let currentPlayer = playerX;

    // Function to check End Conditions
    const checkEnd = function() {
        const board = gameboard.board;
        // Case 1: Player 1 wins
        if(
            (board[0][0] == playerX.sign && board[0][1] == playerX.sign && board[0][2] == playerX.sign) ||
            (board[1][0] == playerX.sign && board[1][1] == playerX.sign && board[1][2] == playerX.sign) ||
            (board[2][0] == playerX.sign && board[2][1] == playerX.sign && board[2][2] == playerX.sign) ||
            (board[0][0] == playerX.sign && board[1][0] == playerX.sign && board[2][0] == playerX.sign) ||
            (board[0][1] == playerX.sign && board[1][1] == playerX.sign && board[2][1] == playerX.sign) ||
            (board[0][2] == playerX.sign && board[1][2] == playerX.sign && board[2][2] == playerX.sign) ||
            (board[0][0] == playerX.sign && board[1][1] == playerX.sign && board[2][2] == playerX.sign) ||
            (board[0][2] == playerX.sign && board[1][1] == playerX.sign && board[2][0] == playerX.sign)
        ) {
            console.log("Player X wins!");
            return 1;
        } 
        // Case 2: Player 2 wins
        else if(
            (board[0][0] == playerO.sign && board[0][1] == playerO.sign && board[0][2] == playerO.sign) ||
            (board[1][0] == playerO.sign && board[1][1] == playerO.sign && board[1][2] == playerO.sign) ||
            (board[2][0] == playerO.sign && board[2][1] == playerO.sign && board[2][2] == playerO.sign) ||
            (board[0][0] == playerO.sign && board[1][0] == playerO.sign && board[2][0] == playerO.sign) ||
            (board[0][1] == playerO.sign && board[1][1] == playerO.sign && board[2][1] == playerO.sign) ||
            (board[0][2] == playerO.sign && board[1][2] == playerO.sign && board[2][2] == playerO.sign) ||
            (board[0][0] == playerO.sign && board[1][1] == playerO.sign && board[2][2] == playerO.sign) ||
            (board[0][2] == playerO.sign && board[1][1] == playerO.sign && board[2][0] == playerO.sign)
        ) {
            console.log("Player O wins!");
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

    const doATurn = function(pos) {
        console.log(`Player ${currentPlayer.sign} turn`);
        gameboard.setBoardValue(pos, currentPlayer.sign);
        if(checkEnd()) {
            return;
        }

        // Switching players
        currentPlayer = currentPlayer == playerX ? playerO : playerX;
    }

    return {doATurn};
}

// IIFE: A single display controllers handles I/O stuff
const displayController = (
    function() {
        const cells = document.querySelectorAll(".cell");
        const g = game();
        // In this factory function, we attach the 'click' event to each
        // cell of the board
        for(let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', function() {
                // This will update the internal board array
                g.doATurn(i);
                // Now render the updated board value
                cells[i].textContent = gameboard.board[Math.floor(i/3)][i%3];
            })
        }
    }
)();

const g = game();