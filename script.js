"use strict";

function player(sign) {
    return {sign};
}

function game() {
    const player1 = player("x");
    const player2 = player("0");

    // IIFE: The anonymous function creates one board object immediately
    const board = (
        function() {

            const board = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ];

            const getBoard = () => {
                console.log(
                    `${board[0][0]}|${board[0][1]}|${board[0][2]}\n${board[1][0]}|${board[1][1]}|${board[1][2]}\n${board[2][0]}|${board[2][1]}|${board[2][2]}`
                );
            };
            return {board, getBoard};
        }
    )();

    const checkWin = function() {
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
        else {
            return 0;
        }
    }

    const runGame = () => {
        let winflag = 0;
        let filled = 0
        let player1 = true;

        while(filled < 9) {
            if(player1) {
                alert("[Player 1 round]");
                const pos = prompt("Enter pos");
                if(pos > 8) {
                    alert("pos must be within range");
                }
                const val = p1val;
                const row = Math.floor(pos/3);
                const col = pos%3;
                if(board[row][col] != "") {
                    // Check if cell is already filled
                    alert("Can't re-enter in a value that is already filled");
                    continue;
                }
                else {
                    // Input the value on the board
                    board[row][col] = p1val;
                    filled++;
                }
                displayBoard();
                if(checkWin() != 0) {
                    winflag = 1;
                    console.log(winflag);
                    break;
                }
                console.log(`Round ${filled} finished`);
                player1 = false;
            }
            else {
                alert("[Player 2 round]");
                const pos = prompt("Enter pos");
                if(pos > 8) {
                    alert("pos must be within range");
                }
                const val = "0"
                const row = Math.floor(pos/3);
                const col = pos%3;
                if(board[row][col] != " ") {
                    // Check if cell is already filled
                    console.log("Can't re-enter in a value that is already filled");
                    continue;
                }
                else {
                    // Input the value on the board
                    board[row][col] = val;
                    filled++;
                    const cell = document.querySelector(`#c${pos}`);
                    cell.textContent = val;
                }
                displayBoard();
                if(checkWin() != 0) {
                    winflag = 1;
                    break;
                }
                console.log(`Round ${filled} finished`);
                player1 = true;
            }
        }

        // If all cells filled but no winner, then flag is unchanged
        if(winflag == 0) {
            console.log("It's a draw");
        } 
    }
    return {runGame};
}

const gameboard = game();


cells.forEach(
    cell => {
        cell.addEventListener( 'click',
            renderCell()
        )
    }
)


gameboard.runGame()