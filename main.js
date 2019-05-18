import { DEFAULT_SETTINGS } from "./config.js";
import { validateEncryptSettings } from "./validate.js";

import { initState, generateKey } from "./lc4.js";

function encrypt(settings) {
    settings = Object.assign(
        {},
        settings,
        { key: generateKey() },
        DEFAULT_SETTINGS
    );

    validateEncryptSettings(settings);

    let state = initState(settings.key);
    let marker = { i: 0, j: 0 };

    // Encrypt nonce and discard
    if (settings.nonce) encryptMsg(state, marker, settings.nonce);
    // Encrypt header data and discard
    if (settings.headerData) encryptMsg(state, marker, settings.headerData);
    // Encrypt message concatenated with signature
    return encryptMsg(
        state,
        marker,
        settings.message + (settings.signature || "")
    );
}

export { encrypt };
