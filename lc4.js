import { ALPHABET, GRIDSIZE } from "./config.js";
import {
    shuffle,
    shiftRowRight,
    shiftColumnDown,
    position,
    validLC4
} from "./helpers.js";

function generateKey(keyword = false) {
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

function initState(key) {
    let S = new Array(GRIDSIZE).fill(0).map(_ => new Array(GRIDSIZE).fill(0));

    for (let k = 0; k < ALPHABET.length; k++) {
        S[Math.floor(k / GRIDSIZE)][k % GRIDSIZE] = key[k];
    }

    return S;
}

function encryptMsg({ state, marker }, msg) {
    return [...msg]
        .map(char => {
            let [row, col] = position(char, state);

            let x =
                (row +
                    Math.floor(
                        ALPHABET.indexOf(state[marker.i][marker.j]) / GRIDSIZE
                    )) %
                GRIDSIZE;
            let y =
                (col +
                    (ALPHABET.indexOf(state[marker.i][marker.j]) % GRIDSIZE)) %
                GRIDSIZE;

            let out = state[x][y];

            shiftRowRight(state, row);

            if (x === row) y = (y + 1) % GRIDSIZE;
            if (marker.i === row) marker.j = (marker.j + 1) % GRIDSIZE;

            shiftColumnDown(state, y);

            if (y === col) row = (row + 1) % GRIDSIZE;
            if (marker.j === y) marker.i = (marker.i + 1) % GRIDSIZE;

            marker.i =
                (marker.i + Math.floor(ALPHABET.indexOf(out) / GRIDSIZE)) %
                GRIDSIZE;
            marker.j =
                (marker.j + (ALPHABET.indexOf(out) % GRIDSIZE)) % GRIDSIZE;

            return out;
        })
        .join("");
}

export { initState, generateKey, encryptMsg };
