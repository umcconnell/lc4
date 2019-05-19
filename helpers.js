import { ALPHABET, GRIDSIZE } from "./config.js";

function shuffle(arr) {
    // Copy the array
    arr = arr.slice();

    // Fisher-Yates Shuffle
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    let l = arr.length,
        temp,
        i;

    while (l) {
        i = Math.floor(Math.random() * l--);

        temp = arr[l];
        arr[l] = arr[i];
        arr[i] = temp;
    }

    return arr;
}

function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shiftRowRight(state, row, marker) {
    state[row] = [
        state[row][state[row].length - 1],
        ...state[row].slice(0, -1)
    ];

    if (marker.i === row) marker.j = (marker.j + 1) % GRIDSIZE;

    return state;
}

function shiftColumnDown(state, col, marker) {
    let shiftRow = GRIDSIZE - 1,
        last = state[shiftRow][col];

    state = state.map(row => {
        let temp = row[col];
        row[col] = last;
        last = temp;
        shiftRow = (shiftRow + 1) % GRIDSIZE;
        return row;
    });

    if (marker.j === col) marker.i = (marker.i + 1) % GRIDSIZE;

    return state;
}

function position(char, state) {
    let vector = [];

    for (let row = 0; row < state.length; row++) {
        let column = state[row].indexOf(char);

        if (column > -1) {
            vector = [row, column];
            break;
        }
    }

    return vector;
}

function validLC4(input) {
    return input.every(char => ALPHABET.indexOf(char) > -1);
}

export {
    shuffle,
    randomElement,
    shiftRowRight,
    shiftColumnDown,
    position,
    validLC4
};
