/** @module lc4/validate */
import { validString } from "./helpers.js";
import { ALPHABET, ALPHABET_LS47 } from "./config.js";

export function validateMode(settings) {
    if (!(settings.mode === "lc4" || settings.mode === "ls47")) {
        throw new TypeError(
            "Invalid mode!\n" + "Mode may be either 'lc4' or 'ls47'."
        );
    }
}

export function validateMsg(settings) {
    if (!settings.message) {
        throw new TypeError("You must specify a message to encrypt");
    } else if (!validString([...settings.message], settings.mode)) {
        throw new TypeError(
            "Message contains invalid characters!\n" +
                "You may only use following characters: " +
                (settings.mode === "lc4" ? ALPHABET : ALPHABET_LS47)
        );
    }
}

export function validateHeaderData(settings) {
    if (
        settings.headerData &&
        !validString([...settings.headerData], settings.mode)
    ) {
        throw new TypeError(
            "Invalid header data!\n" +
                "Header data may only contain following characters: " +
                (settings.mode === "lc4" ? ALPHABET : ALPHABET_LS47)
        );
    }
}

export function validateKey(settings) {
    if (!settings.key) {
        throw new TypeError(
            "You must specify a (valid) key!\n" +
                "You may only use following characters: " +
                (settings.mode === "lc4" ? ALPHABET : ALPHABET_LS47)
        );
    } else if (
        settings.key.length !==
        (settings.mode === "lc4" ? ALPHABET : ALPHABET_LS47).length
    ) {
        throw new TypeError("Key is too short");
    } else if (!validString([...settings.key], settings.mode)) {
        throw new TypeError(
            "Keyword for key generation contains invalid characters!\n" +
                "You may only use following characters: " +
                (settings.mode === "lc4" ? ALPHABET : ALPHABET_LS47)
        );
    }
}

export function validateNonce(settings) {
    if (
        settings.nonce &&
        (!validString([...settings.nonce], settings.mode) ||
            settings.nonce.length < 6)
    ) {
        throw new TypeError(
            "Invalid nonce!\n" +
                "Nonce may only contain following characters: " +
                (settings.mode === "lc4" ? ALPHABET : ALPHABET_LS47) +
                " and must be at least 6 characters long."
        );
    }
}

export function validateSignature(settings) {
    if (
        settings.signature &&
        (!validString([...settings.signature], settings.mode) ||
            settings.signature.length < 10)
    ) {
        throw new TypeError(
            "Invalid signature!\n" +
                "Signature may only contain following characters: " +
                (settings.mode === "lc4" ? ALPHABET : ALPHABET_LS47) +
                " and must be at least 10 characters long."
        );
    }
}

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
    return [
        validateMode,
        validateMsg,
        validateHeaderData,
        validateKey,
        validateNonce,
        validateSignature
    ].forEach(validator => validator(settings));
}
