/** @module lc4/lc4 */
import { ALPHABET, GRIDSIZE } from "./config.js";
import {
    shuffle,
    randomElement,
    shiftRowRight,
    shiftColumnDown,
    position,
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

export function initState(key) {
    let S = new Array(GRIDSIZE).fill(0).map(_ => new Array(GRIDSIZE).fill(0));

    for (let k = 0; k < ALPHABET.length; k++) {
        S[Math.floor(k / GRIDSIZE)][k % GRIDSIZE] = ALPHABET.indexOf(key[k]);
    }

    return S;
}

export function encryptMsg({ state, marker }, msg) {
    return [...msg]
        .map(char => {
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

            return ALPHABET[out];
        })
        .join("");
}

export function decryptMsg({ state, marker }, msg) {
    return [...msg]
        .map(char => {
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

            return ALPHABET[out];
        })
        .join("");
}
