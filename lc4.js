import { shuffle, validLC4 } from "./helpers.js";
import { validateEncryptSettings } from "./validate.js";

const ALPHABET = "#_23456789abcdefghijklmnopqrstuvwxyz";
const GRIDSIZE = 6;
const DEFAULT_SETTINGS = { signature: null, headerData: null, nonce: null };

validLC4 = validLC4(ALPHABET);

function generateKey(keyword = false) {
    if (keyword) {
        if (![...keyword].every(char => ALPHABET.indexOf(char) > -1))
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

function encrypt(settings) {
    settings = Object.assign(
        {},
        settings,
        { key: generateKey() },
        DEFAULT_SETTINGS
    );

    validateEncryptSettings(settings);

    let state = initState(settings.key);
    let marker = { i: 0, j: 0 };

    return encryptMsg(state, marker, settings.message);
}

export { encrypt };
