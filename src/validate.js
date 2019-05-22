import { validLC4 } from "./helpers.js";
import { ALPHABET } from "./config.js";

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
    }
}
