/** @module lc4/config */

/** LC4 alphabet */
export const ALPHABET = "#_23456789abcdefghijklmnopqrstuvwxyz";
/** LS47 alphabet */
export const ALPHABET_LS47 =
    "_abcdefghijklmnopqrstuvwxyz.0123456789,-+*/:?!'()";
/** LC4 state grid size */
export const GRIDSIZE = 6;
/** LS47 state grid size */
export const GRIDSIZE_LS47 = 7;
/** Default LC4/LS47 encryption/decryption settings */
export const DEFAULT_SETTINGS = {
    mode: "lc4",
    signature: null,
    headerData: null,
    nonce: null,
    verbose: false
};
