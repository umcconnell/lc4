import { DEFAULT_SETTINGS } from "./config.js";
import { validateSettings } from "./validate.js";
import { escapeToLC4 } from "./helpers.js";

import {
    initState,
    generateKey,
    generateNonce,
    encryptMsg,
    decryptMsg
} from "./lc4.js";

/**
 * Encrypt a message with LC4
 * @param {Object} settings encryption settings
 * @param {String} settings.message message to encrypt. Invalid LC4 strings are escaped
 * @param {String} settings.key valid LC4 key
 * @param {String} [settings.nonce=null] valid LC4 nonce
 * @param {String} [settings.headerData=null] header data
 * @param {String} [settings.signature=null] signature for signing the message
 * @example <caption>Encrypt a message with a random key</caption>
 * const { encrypt, generateKey } = require("lc4");
 *
 * encrypt({
 *     message: "hello_world",
 *     key: generateKey(),
 *     nonce: "lorem_ipsum"
 * });
 *
 * @example <caption>Encrypt and sign a message</caption>
 * const {encrypt, generateKey, generateNonce} = require("lc4");
 *
 * encrypt({
 *     message: "Lorem Ipsum", // will be escaped to lorem_ipsum
 *     key: generateKey(),
 *     nonce: generateNonce(),
 *     signature: "#secret"
 * });
 * @returns {String} the encrypted (and signed) message
 */
export function encrypt(settings) {
    settings = Object.assign({}, DEFAULT_SETTINGS, settings);

    if (settings.message) settings.message = escapeToLC4(settings.message);
    validateSettings(settings);

    let env = {
        state: initState(settings.key),
        marker: { i: 0, j: 0 }
    };

    // Encrypt nonce and discard
    if (settings.nonce) encryptMsg(env, settings.nonce);
    // Encrypt header data and discard
    if (settings.headerData) encryptMsg(env, settings.headerData);
    // Encrypt message concatenated with signature
    return encryptMsg(env, settings.message + (settings.signature || ""));
}

export function decrypt(settings) {
    settings = Object.assign({}, DEFAULT_SETTINGS, settings);

    validateSettings(settings);

    let env = {
        state: initState(settings.key),
        marker: { i: 0, j: 0 }
    };

    // Encrypt nonce and discard
    if (settings.nonce) encryptMsg(env, settings.nonce);
    // Encrypt header data and discard
    if (settings.headerData) encryptMsg(env, settings.headerData);
    // Decrypt message and signature
    let msg = decryptMsg(env, settings.message);

    if (settings.signature && !msg.endsWith(escapeToLC4(signature)))
        throw new Error("Invalid signature");

    return msg;
}

export { generateKey, generateNonce };
