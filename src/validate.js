/** @module lc4/validate */
import { validString } from "./helpers.js";
import { ALPHABET, ALPHABET_LS47 } from "./config.js";

/**
 * Validates the mode option of the settings
 * @param {Object} settings settings object
 * @param {String} settings.mode encryption/decryption algorithm. Can be either
 * "lc4" or "ls47"
 * @throws {TypeError} when settings.mode is invalid
 * @returns {undefined}
 */
export function validateMode(settings) {
    if (!(settings.mode === "lc4" || settings.mode === "ls47")) {
        throw new TypeError(
            "Invalid mode!\n" + "Mode may be either 'lc4' or 'ls47'."
        );
    }
}

/**
 * Validates the message of the settings
 * @param {Object} settings settings object
 * @param {String} settings.message valid LC4 or LS47 message
 * @param {String} [settings.mode="lc4"] encryption/decryption algorithm. Can be
 * either "lc4" or "ls47"
 * @throws {TypeError} when no message is specified or the message is invalid
 * @return {undefined}
 */
export function validateMsg(settings) {
    if (!settings.message) {
        throw new TypeError("You must specify a message to encrypt");
    } else if (!validString([...settings.message], settings.mode)) {
        throw new TypeError(
            "Message contains invalid characters!\n" +
                "You may only use following characters: " +
                (settings.mode === "ls47" ? ALPHABET_LS47 : ALPHABET)
        );
    }
}

/**
 * Validates the headerDate option of the settings
 * @param {Object} settings settings object
 * @param {String} [settings.headerData=null] optional valid header data
 * @param {String} [settings.mode="lc4"] encryption/decryption algorithm. Can be
 * either "lc4" or "ls47"
 * @throws {TypeError} when header data is specified but contains illegal
 * characters
 * @returns {undefined}
 */
export function validateHeaderData(settings) {
    if (
        settings.headerData &&
        !validString([...settings.headerData], settings.mode)
    ) {
        throw new TypeError(
            "Invalid header data!\n" +
                "Header data may only contain following characters: " +
                (settings.mode === "ls47" ? ALPHABET_LS47 : ALPHABET)
        );
    }
}

/**
 * Validates the key of the settings
 * @param {Object} settings settings object
 * @param {String} settings.key valid key (as long as alphabet, no illegal
 * characters)
 * @param {String} [settings.mode="lc4"] encryption/decryption algorithm. Can be
 * either "lc4" or "ls47"
 * @throws {TypeError} when key is not specified, too short or contains illegal
 * characters
 * @returns {undefined}
 */
export function validateKey(settings) {
    if (!settings.key) {
        throw new TypeError(
            "You must specify a (valid) key!\n" +
                "You may only use following characters: " +
                (settings.mode === "ls47" ? ALPHABET_LS47 : ALPHABET)
        );
    } else if (
        settings.key.length !==
        (settings.mode === "ls47" ? ALPHABET_LS47 : ALPHABET).length
    ) {
        throw new TypeError("Key is too short");
    } else if (!validString([...settings.key], settings.mode)) {
        throw new TypeError(
            "Keyword for key generation contains invalid characters!\n" +
                "You may only use following characters: " +
                (settings.mode === "ls47" ? ALPHABET_LS47 : ALPHABET)
        );
    }
}

/**
 * Validates nonce option of the settings
 * @param {Object} settings settings object
 * @param {String} [settings.nonce=null] optional valid nonce
 * @param {String} [settings.mode="lc4"] encryption/decryption algorithm. Can be
 * either "lc4" or "ls47"
 * @throws {TypeError} when nonce is specified and too short (< 6 characters) or
 * contains illegal characters
 * @returns {undefined}
 */
export function validateNonce(settings) {
    if (
        settings.nonce &&
        (!validString([...settings.nonce], settings.mode) ||
            settings.nonce.length < 6)
    ) {
        throw new TypeError(
            "Invalid nonce!\n" +
                "Nonce may only contain following characters: " +
                (settings.mode === "ls47" ? ALPHABET_LS47 : ALPHABET) +
                " and must be at least 6 characters long."
        );
    }
}

/**
 * Validates signature option of the settings
 * @param {Object} settings settings object
 * @param {String} [settings.signature=null] optional valid signature
 * @param {String} [settings.mode="lc4"] encryption/decryption algorithm. Can be
 * either "lc4" or "ls47"
 * @throws {TypeError} when signature is specified and too short (< 10
 * characters) or contains illegal characters
 * @returns {undefined}
 */
export function validateSignature(settings) {
    if (
        settings.signature &&
        (!validString([...settings.signature], settings.mode) ||
            settings.signature.length < 10)
    ) {
        throw new TypeError(
            "Invalid signature!\n" +
                "Signature may only contain following characters: " +
                (settings.mode === "ls47" ? ALPHABET_LS47 : ALPHABET) +
                " and must be at least 10 characters long."
        );
    }
}

/**
 * Validate encryption/decryption LC4 settings
 * @param {Object} settings LC4 settings message
 * @param {String} settings.mode encryption/decryption algorithm. Can be either
 * "lc4" or "ls47"
 * @param {String} settings.message valid LC4 or LS47 string
 * @param {String} settings.key valid LC4 or LS47 string
 * @param {String} [settings.signature=null] valid LC4 or LS47 string (at least
 * 10 characters long)
 * @param {String} [settings.headerData=null] valid LC4 or LS47 string
 * @param {String} [settings.nonce=null] valid LC4 or LS47 string (at least 6
 * characters long)
 * @throws {TypeError} When message and/or key and/or mode is missing or if
 * invalid value (invalid LC4 or LS47 string) is passed
 * @returns {undefined}
 */
export function validateSettings(settings) {
    return [
        validateMode,
        validateMsg,
        validateHeaderData,
        validateKey,
        validateNonce,
        validateSignature
    ].forEach(validator => validator(settings));
}
