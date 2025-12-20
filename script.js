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
        gameboard[pos/3][pos%3] = val
    }

    const displayBoard = function() {
        console.log(`${gameboard[0]}\n${gameboard[1]}\n${gameboard[2]}`);
    }

    return {addEntry, displayBoard};
}

const board = game();