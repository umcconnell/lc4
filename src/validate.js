/** @module lc4/validate */
import { validLC4 } from "./helpers.js";
import { ALPHABET } from "./config.js";

/**
 * Validate encryption/decryption LC4 settings
 * @param {Object} settings LC4 settings message
 * @param {String} settings.message valid LC4 string
 * @param {String} settings.key valid LC4 string
 * @param {String} [settings.signature=null] valid LC4 string (at least 10
 * characters long)
 * @param {String} [settings.headerData=null] valid LC4 string
 * @param {String} [settings.nonce=null] valid LC4 string (at least 6 characters
 * long)
 * @throws {TypeError} When message and/or key is missing or if invalid value
 * (invalid LC4 string) is passed
 */
export function validateSettings(settings) {
    if (!settings.message) {
        throw new TypeError("You must specify a message to encrypt");
    } else if (!settings.key) {
        throw new TypeError(
            "You must specify a (valid) key!\n" +
                "You may only use following characters: " +
                ALPHABET
        );
    } else if (settings.key.length !== ALPHABET.length) {
        throw new TypeError("Key is too short");
    } else if (!validLC4([...settings.key])) {
        throw new TypeError(
            "Keyword for key generation contains invalid characters!\n" +
                "You may only use following characters: " +
                ALPHABET
        );
    } else if (
        settings.nonce &&
        (!validLC4([...settings.nonce]) || settings.nonce.length < 6)
    ) {
        throw new TypeError(
            "Invalid nonce!\n" +
                "Nonce may only contain following characters: " +
                ALPHABET +
                " and must be at least 6 characters long."
        );
    } else if (
        settings.signature &&
        (!validLC4([...settings.signature]) || settings.signature.length < 10)
    ) {
        throw new TypeError(
            "Invalid signature!\n" +
                "Signature may only contain following characters: " +
                ALPHABET +
                " and must be at least 10 characters long."
        );
    } else if (
        settings.mode &&
        !(
            settings.mode.toLowerCase() === "lc4" ||
            settings.mode.toLowerCase() === "ls47"
        )
    ) {
        throw new TypeError(
            "Invalid mode!\n" + "Mode may be either 'lc4' or 'ls47'."
        );
    }
}
