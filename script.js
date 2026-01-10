"use strict";

// Player object factory, has a parameter for its sign
function player(sign) {
    return {sign};
}

// IIFE: The anonymous function creates one board object immediately
const gameboard = (
    function() {
        const board = ["", "", "", "", "", "", "", "", ""];

        const setBoardValue = (val, pos) => {
            // Check if cell is already filled
            if(board[pos] != "") {
                console.log(`Cell ${pos} is already filled!`);
                return 1;
            }
            else {
                // Cell is not filled, insert value on board
                board[pos] = val;
                return 0;
            }
        }

        const displayBoard = () => {
            console.log(
                `${board[0]}|${board[1]}|${board[2]}\n${board[3]}|${board[4]}|${board[5]}\n${board[6]}|${board[7]}|${board[8]}`
            );
        };
        return {board, setBoardValue, displayBoard};
    }
)();

const game = (
    function() {
        const playerX = player("X");
        const playerO = player("O");

        let currentPlayer = playerX;

        // Function to check End Conditions
        const checkEnd = function() {
            const board = gameboard.board;
            // Case 1: Player 1 wins
            if(
                (board[0] === playerX.sign && board[1] === playerX.sign && board[2] === playerX.sign) ||
                (board[3] === playerX.sign && board[4] === playerX.sign && board[5] === playerX.sign) ||
                (board[6] === playerX.sign && board[7] === playerX.sign && board[8] === playerX.sign) ||
                (board[0] === playerX.sign && board[3] === playerX.sign && board[6] === playerX.sign) ||
                (board[1] === playerX.sign && board[4] === playerX.sign && board[7] === playerX.sign) ||
                (board[2] === playerX.sign && board[5] === playerX.sign && board[8] === playerX.sign) ||
                (board[0] === playerX.sign && board[4] === playerX.sign && board[8] === playerX.sign) ||
                (board[2] === playerX.sign && board[4] === playerX.sign && board[6] === playerX.sign)
            ) {
                console.log("Player X wins!");
                return 1;
            } 
            // Case 2: Player 2 wins
            else if(
                (board[0] === playerO.sign && board[1] === playerO.sign && board[2] === playerO.sign) ||
                (board[3] === playerO.sign && board[4] === playerO.sign && board[5] === playerO.sign) ||
                (board[6] === playerO.sign && board[7] === playerO.sign && board[8] === playerO.sign) ||
                (board[0] === playerO.sign && board[3] === playerO.sign && board[6] === playerO.sign) ||
                (board[1] === playerO.sign && board[4] === playerO.sign && board[7] === playerO.sign) ||
                (board[2] === playerO.sign && board[5] === playerO.sign && board[8] === playerO.sign) ||
                (board[0] === playerO.sign && board[4] === playerO.sign && board[8] === playerO.sign) ||
                (board[2] === playerO.sign && board[4] === playerO.sign && board[6] === playerO.sign)
            ) {
                console.log("Player O wins!");
                return 2;
            }
            // Case 3: It's a draw if no cell is empty
            else if(!(board.includes(""))) {
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
            gameboard.setBoardValue(currentPlayer.sign, pos);
            gameboard.displayBoard();

            // Switching players
            currentPlayer = currentPlayer == playerX ? playerO : playerX;

            return checkEnd();
        }
        return {doATurn};
    }
)();

const displayController = (
    function() {
        const drawBoard = () => {
            //remove previous board
            const gamearea = document.querySelector(".gamearea");
            const oldboard = document.querySelector(".board");
            const newboard = document.createElement("div");
            newboard.classList.toggle("board");
            for(let i = 0; i < 9; i++) {
                let cell = document.createElement("div");
                cell.classList.toggle("cell");
                cell.textContent = gameboard.board[i];
                cell.addEventListener("click", () => {
                    let endcond = 0;
                    console.log(i);
                    endcond = game.doATurn(i);
                    console.log(endcond);
                    if(endcond != 0) {
                        displayEndModal(endcond);
                    }
                    drawBoard();
                })
                newboard.appendChild(cell);
            }
            if(oldboard != null) {
                gamearea.removeChild(oldboard);
            }
            gamearea.appendChild(newboard);
        }

        const displayEndModal = (endcond) => {
            switch(endcond) {
                case 1:
                    alert("Player X wins!");
                    break;
                case 2:
                    alert("Player Y wins!");
                    break;
                default:
                    alert("Draw.")
            }
        }


        return {drawBoard};
    }
)();

displayController.drawBoard();