/** @module lc4/config */

/** LC4 alphabet */
export const ALPHABET = "#_23456789abcdefghijklmnopqrstuvwxyz";
/** LC4 state grid size */
export const GRIDSIZE = 6;
/** Default LC4 encryption/decryption settings */
export const DEFAULT_SETTINGS = {
    mode: "lc4",
    signature: null,
    headerData: null,
    nonce: null,
    verbose: false
};
