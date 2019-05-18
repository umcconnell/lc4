import { ALPHABET, GRIDSIZE } from "./config.js";
import { shuffle, validLC4 } from "./helpers.js";

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
    let S = new Array(GRIDSIZE).fill(0).map(_ => new Array(6).fill(0));

    for (let k = 0; k < ALPHABET.length; k++) {
        S[Math.floor(k / 6)][k % 6] = key[k];
    }

    return S;
}

export { initState, generateKey };
