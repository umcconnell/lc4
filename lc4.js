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
        S[Math.floor(k / GRIDSIZE)][k % GRIDSIZE] = ALPHABET.indexOf(key[k]);
    }

    return S;
}

function encryptMsg({ state, marker }, msg) {
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

export { initState, generateKey, encryptMsg };
