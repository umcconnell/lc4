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
 * const { encrypt, generateKey, generateNonce } = require("lc4");
 *
 * encrypt({
 *     message: "Lorem Ipsum", // will be escaped to lorem_ipsum
 *     key: generateKey(),
 *     nonce: generateNonce(),
 *     signature: "#secret_signature"
 * });
 * @throws {TypeError} Will throw a type error if settings are invalid or
 * missing
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

/**
 * Decrypt a message with LC4
 * @param {Object} settings decryption settings
 * @param {String} settings.message message to decrypt
 * @param {String} settings.key valid LC4 key
 * @param {String} [settings.nonce=null] valid LC4 nonce
 * @param {String} [settings.headerData=null] header data
 * @param {String} [settings.signature=null] signature of signed message
 * @example <caption>Decrypt a message with a given key</caption>
 * const { decrypt } = require("lc4");
 *
 * decrypt({
 *     message: "v74hxj5pxmo",
 *     key: "igqehmd48pvxrl7k36y95j2sfnbo#wc_ztau",
 *     nonce: "lorem_ipsum"
 * });
 *
 * //=> "hello_world"
 * @example <caption>Encrypt and sign a message</caption>
 * const { decrypt } = require("lc4");
 *
 * decrypt({
 *     message: "6q4ijz8p_qxbp5ys5w8qg_srnk3r",
 *     key: "notds7u_i3exc2wlbyzpa4g85#v9fqjkrmh6",
 *     nonce: "r#39_4kgpz",
 *     signature: "#secret_signature"
 * });
 *
 * //=> "lorem_ipsum#secret_signature"
 * @throws {Error} Will throw error "Invalid Signature" if message doesn't end
 * with specified signature
 * @throws {TypeError} Will throw a type error if settings are invalid or
 * missing
 * @returns {String} the encrypted (and signed) message
 */
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

    if (settings.signature && !msg.endsWith(escapeToLC4(settings.signature)))
        throw new Error("Invalid signature");

    return msg;
}

export { generateKey, generateNonce };
