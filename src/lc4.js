/** @module lc4/lc4 */
import { ALPHABET, GRIDSIZE, ALPHABET_LS47, GRIDSIZE_LS47 } from "./config.js";
import {
    shuffle,
    randomElement,
    shiftRowRight,
    shiftColumnDown,
    position,
    printState,
    validString
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
export function generateKey(keyword = false, mode = "lc4") {
    let alphabet = mode.toLowerCase() === "lc4" ? ALPHABET : ALPHABET_LS47;

    if (keyword) {
        if (!validString([...keyword]))
            throw new Error(
                "Keyword for key generation contains invalid characters!\n" +
                    "You may only use following characters: " +
                    alphabet
            );
    }

    // Shuffle alphabet without letters already in keyword
    let key = shuffle(
        [...alphabet].filter(char =>
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
export function generateNonce(length = 10, mode = "lc4") {
    if (length < 6) {
        throw new Error("Nonce must be at least 6 characters long");
    }

    return new Array(length)
        .fill(0)
        .map(_ =>
            randomElement([
                ...(mode.toLowerCase() === "lc4" ? ALPHABET : ALPHABET_LS47)
            ])
        )
        .join("");
}

/**
 * Populate a state matrix by filling in a key row by row
 * @param {(String|Key)} key key string or array
 * @returns {Array} state matrix
 */
export function initState(key, mode = "lc4") {
    let size = mode === "lc4" ? GRIDSIZE : GRIDSIZE_LS47,
        alphabet = mode === "lc4" ? ALPHABET : ALPHABET_LS47;

    let S = new Array(size).fill(0).map(_ => new Array(size).fill(0));

    for (let k = 0; k < alphabet.length; k++) {
        S[Math.floor(k / size)][k % size] = alphabet.indexOf(key[k]);
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
    let alphabet = mode === "lc4" ? ALPHABET : ALPHABET_LS47,
        size = mode === "lc4" ? GRIDSIZE : GRIDSIZE_LS47;

    if (verbose) {
        console.log(`Encrypting: ${msg}`);
        console.log("step: 0");
        printState(state.slice(), { row: -1, col: -1 }, marker, mode);
    }

    return [...msg]
        .map((char, step) => {
            let code = alphabet.indexOf(char);
            let [row, col] = position(code, state);

            let x = (row + Math.floor(state[marker.i][marker.j] / size)) % size;
            let y = (col + (state[marker.i][marker.j] % size)) % size;

            let out = state[x][y];

            shiftRowRight(state, row, marker, mode);
            if (x === row) y = (y + 1) % size;

            shiftColumnDown(state, y, marker, mode);
            if (y === col) row = (row + 1) % size;

            marker.i = (marker.i + Math.floor(out / size)) % size;
            marker.j = (marker.j + (out % size)) % size;

            if (verbose) {
                console.log(`step: ${step + 1}`);
                console.log(new Array(size * 3 - 2).fill("-").join(""));
                printState(state.slice(), { row, col: y }, marker, mode);
                console.log(new Array(size * 3 - 2).fill("-").join(""));
                console.log(
                    `pt: \x1b[31m${char}\x1b[0m  ct: \x1b[31m${
                        alphabet[out]
                    }\x1b[0m`,
                    "\n"
                );
            }

            return alphabet[out];
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
    let alphabet = mode === "lc4" ? ALPHABET : ALPHABET_LS47,
        size = mode === "lc4" ? GRIDSIZE : GRIDSIZE_LS47;

    if (verbose) {
        console.log(`Decrypting: ${msg}`);
        console.log("step: 0");
        printState(state.slice(), { row: -1, col: -1 }, marker, mode);
    }

    return [...msg]
        .map((char, step) => {
            let code = alphabet.indexOf(char);
            let [x, y] = position(code, state);

            let row = (x - Math.floor(state[marker.i][marker.j] / size)) % size;
            let col = (y - (state[marker.i][marker.j] % size)) % size;

            if (row < 0) row += size;
            if (col < 0) col += size;

            let out = state[row][col];

            shiftRowRight(state, row, marker, mode);
            if (x === row) y = (y + 1) % size;

            shiftColumnDown(state, y, marker, mode);
            if (y === col) row = (row + 1) % size;

            marker.i = (marker.i + Math.floor(code / size)) % size;
            marker.j = (marker.j + (code % size)) % size;

            if (verbose) {
                console.log(`step: ${step + 1}`);
                console.log(new Array(size * 3 - 2).fill("-").join(""));
                printState(state.slice(), { row, col: y }, marker, mode);
                console.log(new Array(size * 3 - 2).fill("-").join(""));
                console.log(
                    `ct: \x1b[31m${char}\x1b[0m  pt: \x1b[31m${
                        alphabet[out]
                    }\x1b[0m`,
                    "\n"
                );
            }

            return alphabet[out];
        })
        .join("");
}
