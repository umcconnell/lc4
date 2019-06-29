/** @module lc4/lc4 */
import { ALPHABET, GRIDSIZE } from "./config.js";
import {
    shuffle,
    randomElement,
    shiftRowRight,
    shiftColumnDown,
    position,
    printState,
    validLC4
} from "./helpers.js";

/**
 * Generate a valid random LC4 key
 * @param {String} [keyword=false] keyword to base key off (less secure)
 * @example <caption>Generate a random key</caption>
 * let { generateKey } = require("lc4");
 *
 * generateKey();
 * @example <caption>Encrypt a message with a random key</caption>
 * const { encrypt, generateKey } = require("lc4");
 *
 * encrypt({
 *     message: "hello_world",
 *     key: generateKey(),
 * });
 * @throws {Error} Will throw an error if the keyword contains invalid LC4
 * characters
 * @returns {String} a valid LC4 key
 */
export function generateKey(keyword = false) {
    if (keyword) {
        if (!validLC4([...keyword]))
            throw new Error(
                "Keyword for key generation contains invalid characters!\n" +
                    "You may only use following characters: " +
                    ALPHABET
            );
    }

    // Shuffle alphabet without letters already in keyword
    let key = shuffle(
        [...ALPHABET].filter(char =>
            keyword ? keyword.indexOf(char) > -1 : true
        )
    ).join("");

    return (keyword ? keyword : "") + key;
}

/**
 * Generate a valid random LC4 nonce
 * @param {Number} [length=10] length of nonce (at least 6)
 * @example <caption>Generate a random nonce</caption>
 * let { generateNonce } = require("lc4");
 *
 * generateNonce();
 * @example <caption>Encrypt a message with a random nonce</caption>
 * const { encrypt, generateKey, generateNonce } = require("lc4");
 *
 * encrypt({
 *     message: "Lorem Ipsum",
 *     key: generateKey(),
 *     nonce: generateNonce()
 * })
 * @throws {Error} Will throw an error if length is smaller than 6
 * @returns {String} a valid LC4 nonce
 */
export function generateNonce(length = 10) {
    if (length < 6) {
        throw new Error("Nonce must be at least 6 characters long");
    }

    return new Array(length)
        .fill(0)
        .map(_ => randomElement([...ALPHABET]))
        .join("");
}

/**
 * Populate a state matrix by filling in a key row by row
 * @param {(String|Key)} key key string or array
 * @returns {Array} state matrix
 */
export function initState(key) {
    let S = new Array(GRIDSIZE).fill(0).map(_ => new Array(GRIDSIZE).fill(0));

    for (let k = 0; k < ALPHABET.length; k++) {
        S[Math.floor(k / GRIDSIZE)][k % GRIDSIZE] = ALPHABET.indexOf(key[k]);
    }

    return S;
}

/**
 * Encrypt a cleartext message and change the environment
 * @param {Object} env environment object
 * @param {Array} env.state state matrix
 * @param {Object} env.marker marker object representing active element
 * @param {Number} env.marker.i row of the marker in the state
 * @param {Number} env.marker.j column of the marker in the state
 * @param {String} msg cleartext message
 * @param {Boolean} [verbose=false] boolean indicating wether verbose mode
 * should be used (will print out intermediate steps)
 * @returns {String} ciphertext message
 */
export function encryptMsg({ state, marker, mode }, msg, verbose = false) {
    if (verbose) {
        console.log(`Encrypting: ${msg}`);
        console.log("step: 0");
        printState(state.slice(), { row: -1, col: -1 }, marker);
    }

    return [...msg]
        .map((char, step) => {
            let code = ALPHABET.indexOf(char);
            let [row, col] = position(code, state);

            let x =
                (row + Math.floor(state[marker.i][marker.j] / GRIDSIZE)) %
                GRIDSIZE;
            let y = (col + (state[marker.i][marker.j] % GRIDSIZE)) % GRIDSIZE;

            let out = state[x][y];

            shiftRowRight(state, row, marker);
            if (x === row) y = (y + 1) % GRIDSIZE;

            shiftColumnDown(state, y, marker);
            if (y === col) row = (row + 1) % GRIDSIZE;

            marker.i = (marker.i + Math.floor(out / GRIDSIZE)) % GRIDSIZE;
            marker.j = (marker.j + (out % GRIDSIZE)) % GRIDSIZE;

            if (verbose) {
                console.log(`step: ${step + 1}`);
                console.log(new Array(GRIDSIZE * 3 - 2).fill("-").join(""));
                printState(state.slice(), { row, col: y }, marker);
                console.log(new Array(GRIDSIZE * 3 - 2).fill("-").join(""));
                console.log(
                    `pt: \x1b[31m${char}\x1b[0m  ct: \x1b[31m${
                        ALPHABET[out]
                    }\x1b[0m`,
                    "\n"
                );
            }

            return ALPHABET[out];
        })
        .join("");
}

/**
 * Decrypt a ciphertext message and change the environment
 * @param {Object} env environment object
 * @param {Array} env.state state matrix
 * @param {Object} env.marker marker object representing active element
 * @param {Number} env.marker.i row of the marker in the state
 * @param {Number} env.marker.j column of the marker in the state
 * @param {String} msg ciphertext message
 * @param {Boolean} [verbose=false] boolean indicating wether verbose mode
 * should be used (will print out intermediate steps)
 * @returns {String} cleartext message
 */
export function decryptMsg({ state, marker, mode }, msg, verbose) {
    if (verbose) {
        console.log(`Decrypting: ${msg}`);
        console.log("step: 0");
        printState(state.slice(), { row: -1, col: -1 }, marker);
    }

    return [...msg]
        .map((char, step) => {
            let code = ALPHABET.indexOf(char);
            let [x, y] = position(code, state);

            let row =
                (x - Math.floor(state[marker.i][marker.j] / GRIDSIZE)) %
                GRIDSIZE;
            let col = (y - (state[marker.i][marker.j] % GRIDSIZE)) % GRIDSIZE;

            if (row < 0) row += GRIDSIZE;
            if (col < 0) col += GRIDSIZE;

            let out = state[row][col];

            shiftRowRight(state, row, marker);
            if (x === row) y = (y + 1) % GRIDSIZE;

            shiftColumnDown(state, y, marker);
            if (y === col) row = (row + 1) % GRIDSIZE;

            marker.i = (marker.i + Math.floor(code / GRIDSIZE)) % GRIDSIZE;
            marker.j = (marker.j + (code % GRIDSIZE)) % GRIDSIZE;

            if (verbose) {
                console.log(`step: ${step + 1}`);
                console.log(new Array(GRIDSIZE * 3 - 2).fill("-").join(""));
                printState(state.slice(), { row, col: y }, marker);
                console.log(new Array(GRIDSIZE * 3 - 2).fill("-").join(""));
                console.log(
                    `ct: \x1b[31m${char}\x1b[0m  pt: \x1b[31m${
                        ALPHABET[out]
                    }\x1b[0m`,
                    "\n"
                );
            }

            return ALPHABET[out];
        })
        .join("");
}
