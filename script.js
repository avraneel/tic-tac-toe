"use strict";

function player(name, sign) {
    return {name, sign};
}


function game() {
    const board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    const getBoard = () => board;


    const displayBoard = function() {
        console.log(
            `${board[0][0]}|${board[0][1]}|${board[0][2]}\n${board[1][0]}|${board[1][1]}|${board[1][2]}\n${board[2][0]}|${board[2][1]}|${board[2][2]}`
        );
    }

    const win = function() {
        if(
            (board[0][0] == 'x' && board[0][1] == 'x' && board[0][2] == 'x') ||
            (board[1][0] == 'x' && board[1][1] == 'x' && board[1][2] == 'x') ||
            (board[2][0] == 'x' && board[2][1] == 'x' && board[2][2] == 'x') ||
            (board[0][0] == 'x' && board[1][0] == 'x' && board[2][0] == 'x') ||
            (board[0][1] == 'x' && board[1][1] == 'x' && board[2][1] == 'x') ||
            (board[0][2] == 'x' && board[1][2] == 'x' && board[2][2] == 'x') ||
            (board[0][0] == 'x' && board[1][1] == 'x' && board[2][2] == 'x') ||
            (board[0][2] == 'x' && board[1][1] == 'x' && board[2][0] == 'x')
        ) {
            console.log("Player 1 wins!");
            return 1;
        } 
        else if(
            (board[0][0] == '0' && board[0][1] == '0' && board[0][2] == '0') ||
            (board[1][0] == '0' && board[1][1] == '0' && board[1][2] == '0') ||
            (board[2][0] == '0' && board[2][1] == '0' && board[2][2] == '0') ||
            (board[0][0] == '0' && board[1][0] == '0' && board[2][0] == '0') ||
            (board[0][1] == '0' && board[1][1] == '0' && board[2][1] == '0') ||
            (board[0][2] == '0' && board[1][2] == '0' && board[2][2] == '0') ||
            (board[0][0] == '0' && board[1][1] == '0' && board[2][2] == '0') ||
            (board[0][2] == '0' && board[1][1] == '0' && board[2][0] == '0')
        ) {
            console.log("Player 2 wins!");
            return 2;
        }
        else {
            return 0;
        }
    }

    const runGame = function() {
        let flag = 0;
        let filled = 0

        while(filled < 9) {
            const pos = prompt("Enter pos");
            if(pos > 8) {
                alert("pos must be within range");
            }
            const val = prompt("Enter val");
            const row = Math.floor(pos/3);
            const col = pos%3;
            if(board[row][col] == 'x' || board[row][col] == '0') {
                // Check if cell is already filled
                console.log("Can't re-enter in a value that is already filled");
                continue;
            }
            else {
                board[row][col] = val;
                filled++;
            }
            displayBoard();
            if(win() != 0) {
                flag = 1;
                break;
            }
            console.log(`Round ${filled} finished`);
        }
        if(flag == 0) {
            console.log("It's a draw");
        } 
    }
    return {runGame, getBoard};
}

const gameboard = game();

function renderBoard() {
    const board = [
        ['x', '0', 'x'],
        ['x', '0', '0'],
        ['0', 'x', 'x']
    ];
}

