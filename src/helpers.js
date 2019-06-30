/** @module lc4/helpers */
import { ALPHABET, ALPHABET_LS47, GRIDSIZE, GRIDSIZE_LS47 } from "./config.js";

/**
 * Escape string to valid LC4 or LS47 string
 * @param {String} string (invalid) LC4 or LS47 string
 * @param {String} [mode="lc4"] Escape mode (either "lc4" or "ls47")
 * @example
 * escapeString("Hello World! This is the 10th test!");
 *
 * //=> "hello_world_this_is_the__#th_test"
 * @returns {String} valid LC4 or LS47 string
 */
export function escapeString(string, mode = "lc4") {
    if (mode === "lc4") string = string.replace(/0/g, "#").replace(/1/g, "_");

    return [
        ...string
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
        .filter(
            char =>
                (mode === "ls47" ? ALPHABET_LS47 : ALPHABET).indexOf(char) > -1
        )
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
 * @param {String} [mode="lc4"] encryption/decryption algorithm. Can be either
 * "lc4" or "ls47"
 * @returns {Array} updated state matrix
 */
export function shiftRowRight(state, row, marker, mode = "lc4") {
    let size = mode === "ls47" ? GRIDSIZE_LS47 : GRIDSIZE;

    state[row] = [
        state[row][state[row].length - 1],
        ...state[row].slice(0, -1)
    ];

    if (marker.i === row) marker.j = (marker.j + 1) % size;

    return state;
}

/**
 * Shift given column in the state matrix and move the marker if needed
 * @param {Array} state state matrix
 * @param {Number} col index of column to shift
 * @param {Object} marker marker object representing active element
 * @param {Number} marker.i row of the marker in the state
 * @param {Number} marker.j column of the marker in the state
 * @param {String} [mode="lc4"] encryption/decryption algorithm. Can be either
 * "lc4" or "ls47"
 * @returns {Array} updated state matrix
 */
export function shiftColumnDown(state, col, marker, mode = "lc4") {
    let size = mode === "ls47" ? GRIDSIZE_LS47 : GRIDSIZE,
        shiftRow = size - 1,
        last = state[shiftRow][col];

    state = state.map(row => {
        let temp = row[col];
        row[col] = last;
        last = temp;
        shiftRow = (shiftRow + 1) % size;
        return row;
    });

    if (marker.j === col) marker.i = (marker.i + 1) % size;

    return state;
}

/**
 * Return the coordinates of given search element in the state matrix
 * @param {*} char search element
 * @param {Array} state state matrix
 * @returns {Array} position vector in the form [`row`, `column`]
 */
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

/**
 * Print out state for verbose mode
 * @param {Array} state state array to print out
 * @param {Object} chara input character reference being encrypted/decrypted
 * @param {Number} chara.row row of input character in the state matrix
 * (-1 for no input character)
 * @param {Number} chara.col column of input character in the state matrix
 * (-1 for no input character)
 * @param {Object} marker marker object representing active element
 * @param {Number} marker.i row of the marker in the state
 * @param {Number} marker.j column of the marker in the state
 * @param {String} [mode="lc4"] encryption/decryption algorithm. Can be either
 * "lc4" or "ls47"
 * @returns {undefined}
 */
export function printState(state, chara, marker, mode = "lc4") {
    // Deep-copy state
    state = JSON.parse(JSON.stringify(state)).map(row =>
        row.map(char => (mode === "ls47" ? ALPHABET_LS47 : ALPHABET)[char])
    );

    let markerChar = "\x1b[31m@\x1b[0m";
    state[marker.i][marker.j] += markerChar;

    console.log(
        state
            .map((row, i) => {
                let out = row
                    .map((char, j) =>
                        i === chara.row || j === chara.col
                            ? `\x1b[32m${char}\x1b[0m`
                            : char
                    )
                    .join("  ");

                return i === marker.i
                    ? out.replace(`${markerChar} `, markerChar)
                    : out;
            })
            .join("\n")
    );
}

/**
 * Determine if input contains only valid LC4 or LS47 characters
 * @param {Array} input input array
 * @param {String} [mode="lc4"] encryption/decryption algorithm. Can be either
 * "lc4" or "ls47"
 * @returns {Boolean} indicating if input is valid LC4 or LS47
 */
export function validString(input, mode = "lc4") {
    let alphabet = mode.toLowerCase() === "lc4" ? ALPHABET : ALPHABET_LS47;
    return input.every(char => alphabet.indexOf(char) > -1);
}
