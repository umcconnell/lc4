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
 * Encrypt a message with LC4 or LS47
 * @param {Object} settings encryption settings
 * @param {String} [settings.mode="lc4"] encryption algorithm. Can be either
 * "lc4" or "ls47"
 * @param {String} settings.message message to encrypt. Invalid LC4 or LS47
 * strings are escaped with the `escapeString` method
 * @param {String} settings.key valid LC4 or LS47 key
 * @param {String} [settings.nonce=null] valid LC4 or LS47 nonce
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
 * @example <caption>Encrypt a message with a random key and LS47</caption>
 * const { encrypt, generateKey } = require("lc4");
 *
 * encrypt({
 *     message: "hello_ls47",
 *     key: generateKey(null, "ls47"),
 *     nonce: "lorem_ipsum",
 *     mode: "ls47"
 * })
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
 * Decrypt a message with LC4 or LS47
 * @param {Object} settings decryption settings
 * @param {String} [settings.mode="lc4"] decryption algorithm. Can be either
 * "lc4" or "ls47"
 * @param {String} settings.message message to decrypt
 * @param {String} settings.key valid LC4 or LS47 key
 * @param {String} [settings.nonce=null] valid LC4 or LS47 nonce
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
 * @example <caption>Decrypt a message with a given key and LS47</caption>
 * const { decrypt } = require("lc4");
 *
 * decrypt({
 *     message: "8.bc-'suz+6l",
 *     key: "4un)pj0c6(h!ms+_-5q*vkt,zi?9xoglw:18e'.dy/rba73f2",
 *     mode: "ls47"
 * })
 *
 * //=> "hello_world!"
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
 * Generate a valid random LC4 or LS47 key
 * @param {String} [keyword=false] keyword to base key off (less secure) or
 * falsy value if key shouldn't be based off a keyword
 * @param {String} [mode="lc4"] encryption/decryption mode. Can be either "lc4"
 * or "ls47"
 * @example <caption>Generate a random key</caption>
 * let { generateKey } = require("lc4");
 *
 * generateKey();
 * @example <caption>Generate a random LS47 key without keword</caption>
 * let { generateKey } = require("lc4");
 *
 * generateKey(null, "ls47");
 * @example <caption>Encrypt a message with a random key</caption>
 * const { encrypt, generateKey } = require("lc4");
 *
 * encrypt({
 *     message: "hello_world",
 *     key: generateKey(),
 * });
 * @throws {Error} Will throw an error if the keyword contains invalid LC4 or
 * LS47 characters
 * @returns {String} a valid LC4 or LS47 key
 */
export function generateKey(keyword, mode = "lc4") {
    return _generateKey(keyword, mode);
}

/**
 * Generate a valid random LC4 or LS47 nonce
 * @param {Number} [length=10] length of nonce (at least 6)
 * @param {String} [mode="lc4"] encryption/decryption mode. Can be either "lc4"
 * or "ls47"
 * @example <caption>Generate a random nonce</caption>
 * let { generateNonce } = require("lc4");
 *
 * generateNonce();
 * @example <caption>Encrypt a message with LS47 and a random nonce</caption>
 * const { encrypt, generateKey, generateNonce } = require("lc4");
 *
 * encrypt({
 *     message: "Lorem Ipsum!",
 *     key: generateKey(null, "ls47"),
 *     nonce: generateNonce(10, "ls47")
 * })
 * @throws {Error} Will throw an error if length is smaller than 6
 * @returns {String} a valid LC4 or LS47 nonce
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

/**
 * Escape string to valid LS47 string
 * @param {String} string (invalid) LS47 string
 * @example
 * let { escapeToLS47 } = require("lc4");
 * escapeToLS47("Hello World! This is the 10th test!");
 *
 * //=> "hello_world!_this_is_10th_test!"
 * @returns {String} valid LS47 string
 */
export function escapeToLS47(string) {
    return _escapeString(string, "ls47");
}

/**
 * Escapes a string to a valid LC4 or LS47 string
 * @param {String} string (invalid) LC4 or LS47 string
 * @param {String} [mode="lc4"] encryption/decryption mode. Can be either "lc4"
 * or "ls47"
 * @example
 * let { escapeString } = require("lc4");
 * escapeString("Hello World! This is the 10th test!", "ls47");
 *
 * //=> "hello_world!_this_is_10th_test!"
 * @example
 * let { escapeString } = require("lc4");
 * escapeString("Hello World! This is the 10th test!", "lc4");
 *
 * //=> "hello_world_this_is_the__#th_test"
 * @returns {String} valid LC4 or LS47 string
 */
export function escapeString(string, mode) {
    return _escapeString(string, mode);
}
