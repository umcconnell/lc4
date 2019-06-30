/** @module lc4 */
import { DEFAULT_SETTINGS } from "./config.js";
import { validateSettings, validateMode } from "./validate.js";
import { escapeString as _escapeString } from "./helpers.js";

import {
    initState,
    encryptMsg,
    decryptMsg,
    generateKey as _generateKey,
    generateNonce as _generateNonce
} from "./lc4.js";

/**
 * Encrypt a message with LC4
 * @param {Object} settings encryption settings
 * @param {String} settings.message message to encrypt. Invalid LC4 strings are
 * escaped with the `escapeToLC4` method
 * @param {String} settings.key valid LC4 key
 * @param {String} [settings.nonce=null] valid LC4 nonce
 * @param {String} [settings.headerData=null] header data
 * @param {String} [settings.signature=null] signature for signing the message
 * @param {Boolean} [settings.verbose=false] boolean indicating whether verbose
 * mode should be used (will print intermediate steps to console)
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
 *     signature: "#secret_signature",
 *     verbose: true
 * });
 * @throws {TypeError} Will throw a type error if settings are invalid or
 * missing
 * @returns {String} the encrypted (and signed) message
 */
export function encrypt(settings) {
    settings = Object.assign({}, DEFAULT_SETTINGS, settings);

    settings.mode = settings.mode.toLowerCase();
    validateMode(settings);

    if (settings.message)
        settings.message = _escapeString(settings.message, settings.mode);
    if (settings.headerData)
        settings.headerData = _escapeString(settings.headerData, settings.mode);

    validateSettings(settings);

    let env = {
        state: initState(settings.key, settings.mode),
        marker: { i: 0, j: 0 },
        mode: settings.mode
    };

    // Encrypt nonce and discard
    if (settings.nonce) encryptMsg(env, settings.nonce, settings.verbose);
    // Encrypt header data and discard
    if (settings.headerData)
        encryptMsg(env, settings.headerData, settings.verbose);
    // Encrypt message concatenated with signature
    return encryptMsg(
        env,
        settings.message + (settings.signature || ""),
        settings.verbose
    );
}

/**
 * Decrypt a message with LC4
 * @param {Object} settings decryption settings
 * @param {String} settings.message message to decrypt
 * @param {String} settings.key valid LC4 key
 * @param {String} [settings.nonce=null] valid LC4 nonce
 * @param {String} [settings.headerData=null] header data
 * @param {String} [settings.signature=null] signature of signed message
 * @param {Boolean} [settings.verbose=false] boolean indicating whether verbose
 * mode should be used (will print intermediate steps to console)
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
 *     signature: "#secret_signature",
 *     verbose: true
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

    settings.mode = settings.mode.toLowerCase();
    validateMode(settings);

    if (settings.headerData)
        settings.headerData = _escapeString(settings.headerData, settings.mode);

    validateSettings(settings);

    let env = {
        state: initState(settings.key, settings.mode),
        marker: { i: 0, j: 0 },
        mode: settings.mode
    };

    // Encrypt nonce and discard
    if (settings.nonce) encryptMsg(env, settings.nonce, settings.verbose);
    // Encrypt header data and discard
    if (settings.headerData)
        encryptMsg(env, settings.headerData, settings.verbose);
    // Decrypt message and signature
    let msg = decryptMsg(env, settings.message, settings.verbose);

    if (
        settings.signature &&
        !msg.endsWith(_escapeString(settings.signature, settings.mode))
    )
        throw new Error("Invalid signature");

    return msg;
}

/**
 * Generate a valid random LC4 key
 * @param {String} [keyword=false] keyword to base key off (less secure)
 * @example <caption>Generate a random key</caption>
 * let { generateKey } = require("lc4");
 *
 * generateKey();
 * @example <caption>Encrypt a message with a random key</caption>
 * const { encrypt, generateKey } = require("lc4");
 *
 * encrypt({
 *     message: "hello_world",
 *     key: generateKey(),
 * });
 * @throws {Error} Will throw an error if the keyword contains invalid LC4
 * characters
 * @returns {String} a valid LC4 key
 */
export function generateKey(keyword, mode = "lc4") {
    return _generateKey(keyword, mode);
}

/**
 * Generate a valid random LC4 nonce
 * @param {Number} [length=10] length of nonce (at least 6)
 * @example <caption>Generate a random nonce</caption>
 * let { generateNonce } = require("lc4");
 *
 * generateNonce();
 * @example <caption>Encrypt a message with a random nonce</caption>
 * const { encrypt, generateKey, generateNonce } = require("lc4");
 *
 * encrypt({
 *     message: "Lorem Ipsum",
 *     key: generateKey(),
 *     nonce: generateNonce()
 * })
 * @throws {Error} Will throw an error if length is smaller than 6
 * @returns {String} a valid LC4 nonce
 */
export function generateNonce(length, mode = "lc4") {
    return _generateNonce(length, mode);
}

/**
 * Escape string to valid LC4 string
 * @param {String} string (invalid) LC4 string
 * @example
 * let { escapeToLC4 } = require("lc4");
 * escapeToLC4("Hello World! This is the 10th test!");
 *
 * //=> "hello_world_this_is_the__#th_test"
 * @returns {String} valid LC4 string
 */
export function escapeToLC4(string) {
    return _escapeString(string, "lc4");
}

export function escapeToLS47(string) {
    return _escapeString(string, "ls47");
}

export function escapeString(string, mode) {
    return _escapeString(string, mode);
}
