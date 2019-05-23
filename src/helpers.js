/** @module lc4/helpers */
import { ALPHABET, GRIDSIZE } from "./config.js";

/**
 * Escape string to valid LC4 string
 * @param {String} string (invalid) LC4 string
 * @example
 * escapeToLC4("Hello World! This is the 10th test!");
 *
 * //=> "hello_world_this_is_the__#th_test"
 * @returns {String} valid LC4 string
 */
export function escapeToLC4(string) {
    return [
        ...string
            .replace(/0/g, "#")
            .replace(/1/g, "_")
            .replace(/\u00dc/g, "Ue")
            .replace(/\u00fc/g, "ue")
            .replace(/\u00c4/g, "Ae")
            .replace(/\u00e4/g, "ae")
            .replace(/\u00d6/g, "Oe")
            .replace(/\u00f6/g, "oe")
            .replace(/\u00df/g, "ss")
            .replace(/\s/g, "_")
            .toLowerCase()
    ]
        .filter(char => ALPHABET.indexOf(char) > -1)
        .join("");
}

/**
 * Fisher-Yates array Shuffle
 * @param {Array} arr input array to be shuffled
 * @returns {Array} shuffled array
 */
export function shuffle(arr) {
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

/**
 * Pick a random element from an array
 * @param {Array} arr input array to pick element from
 * @returns {*} a random element from the array
 */
export function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shift given row in the state matrix and move the marker if needed
 * @param {Array} state state matrix
 * @param {Number} row index of row to shift
 * @param {Object} marker marker object representing active element
 * @param {Number} marker.i row of the marker in the state
 * @param {Number} marker.j column of the marker in the state
 * @returns {Array} updated state matrix
 */
export function shiftRowRight(state, row, marker) {
    state[row] = [
        state[row][state[row].length - 1],
        ...state[row].slice(0, -1)
    ];

    if (marker.i === row) marker.j = (marker.j + 1) % GRIDSIZE;

    return state;
}

export function shiftColumnDown(state, col, marker) {
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

export function position(char, state) {
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

export function validLC4(input) {
    return input.every(char => ALPHABET.indexOf(char) > -1);
}
