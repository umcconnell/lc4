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

    return encryptMsg(state, marker, settings.message);
}

export { encrypt };
