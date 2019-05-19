import { DEFAULT_SETTINGS } from "./config.js";
import { validateEncryptSettings } from "./validate.js";

import { initState, generateKey, encryptMsg } from "./lc4.js";

function encrypt(settings) {
    settings = Object.assign(
        {},
        settings,
        { key: generateKey() },
        DEFAULT_SETTINGS
    );

    validateEncryptSettings(settings);

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

export { encrypt };
