import { validLC4 } from "./helpers.js";
import { ALPHABET } from "./config.js";

function validateSettings(settings) {
    if (!settings.message) {
        throw new Error("You must specify a message to encrypt");
    } else if (!settings.key) {
        throw new Error(
            "You must specify a (valid) key!\n" +
                "You may only use following characters: " +
                ALPHABET
        );
    } else if (settings.key.length !== ALPHABET.length) {
        throw new Error("Key is too short");
    } else if (!validLC4([...settings.key])) {
        throw new Error(
            "Keyword for key generation contains invalid characters!\n" +
                "You may only use following characters: " +
                ALPHABET
        );
    } else if (
        settings.nonce &&
        (!validLC4([...settings.nonce]) || settings.nonce.length < 6)
    ) {
        throw new Error(
            "Invalid nonce!\n" +
                "Nonce may only contain following characters: " +
                ALPHABET +
                " and must be at least 6 characters long."
        );
    } else if (
        settings.signature &&
        (!validLC4([...settings.signature]) || settings.signature.length < 10)
    ) {
        throw new Error(
            "Invalid signature!\n" +
                "Signature may only contain following characters: " +
                ALPHABET +
                " and must be at least 10 characters long."
        );
    }
}

export { validateSettings };
