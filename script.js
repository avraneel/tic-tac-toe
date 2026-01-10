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
        let gameOver = false;

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
                gameOver = true;
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
                gameOver = true;
                return 2;
            }
            // Case 3: It's a draw if no cell is empty
            else if(!(board.includes(""))) {
                gameOver = true;
                return 3;
            }
            // Case 4: Game goes on
            else {
                return 0;
            }
        }

        const doATurn = function(pos) {
            // When game is over, there are no more turns
            // let endcond = checkEnd();
            // console.log(endcond);
            if(gameOver == false) {
                console.log(`Player ${currentPlayer.sign} turn`);
                let setReturn = gameboard.setBoardValue(currentPlayer.sign, pos);
                let endcond = checkEnd();
                // Switching players
                if(setReturn == 0) {
                    console.log("Switching players...");
                    currentPlayer = currentPlayer == playerX ? playerO : playerX;
                }
                else {
                    console.log(`Cell ${pos} is already filled! Player ${currentPlayer.sign} has to play again..`);
                }
                gameboard.displayBoard();
                displayController.displayEndMessage(endcond);
                if(gameOver == true) {
                    switch(endcond) {
                        case 1:
                            console.log("Player X wins!");
                            break;
                        case 2:
                            console.log("Player O wins!");
                            break;
                        case 3:
                            console.log("It's a draw.");
                            break;
                    }
                }
            }
            else {
                console.log("Game is over. There are no more turns.");
            }
        }
        return {doATurn};
    }
)();

const displayController = (
    function() {
        const boardDom = document.querySelector(".board");
        const statusDom = document.querySelector(".status");

        const drawBoard = () => {
            //remove previous board
            // const consoleboard = ["X","O","X","O","X","O","X","O","X"];
            // const board = document.querySelector(".board");
            // const oldboard = document.querySelector(".board");
            // const newboard = document.createElement("div");
            // newboard.classList.toggle("board");
            for(let i = 0; i < boardDom.children.length; i++) {
                // let cell = document.createElement("div");
                // cell.classList.toggle("cell");
                boardDom.children[i].textContent = gameboard.board[i];
                // newboard.appendChild(cell);
            }
            // board.appendChild(newboard);
        }

        for(let i = 0; i < boardDom.children.length; i++) {
            boardDom.children[i].addEventListener("click", () => {
                game.doATurn(i);
                drawBoard();
            })
        }

        const displayEndMessage = (endcond) => {
            switch(endcond) {
                case 1:
                    statusDom.textContent = "Player X wins!";
                    break;
                case 2:
                    statusDom.textContent = "Player Y wins!";
                    break;
                default:
                    statusDom.textContent = "Draw.";
            }
        }

        return {displayEndMessage};
    }
)();