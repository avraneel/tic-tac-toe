"use strict";

function player(name) {
    return {name};
}


function game() {
    const gameboard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    const addEntry = function (pos, val) {
        gameboard[Math.floor(pos/3)][pos%3] = val;
    }

    const displayBoard = function() {
        console.log(
            `${gameboard[0][0]} ${gameboard[0][1]} ${gameboard[0][2]}\n${gameboard[1][0]} ${gameboard[1][1]} ${gameboard[1][2]}\n${gameboard[2][0]} ${gameboard[2][1]} ${gameboard[2][2]}`
        );
    }

    return {addEntry, displayBoard};
}

const board = game();
board.addEntry(0, '0');
board.addEntry(1, 'x');
board.addEntry(3, 'x');
board.addEntry(6, '0');
board.addEntry(8, 'x');
board.displayBoard();