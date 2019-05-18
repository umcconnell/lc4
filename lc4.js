import { shuffle } from "./helpers.js";

const ALPHABET = "#_23456789abcdefghijklmnopqrstuvwxyz";
const GRIDSIZE = 6;

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
    );

    return (keyword ? keyword : "") + key;
}
