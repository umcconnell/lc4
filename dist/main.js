import{DEFAULT_SETTINGS}from"./config.js";import{validateSettings}from"./validate.js";import{escapeToLC4 as _escapeToLC4}from"./helpers.js";import{initState,encryptMsg,decryptMsg,generateKey as _generateKey,generateNonce as _generateNonce}from"./lc4.js";export function encrypt(a){a=Object.assign({},DEFAULT_SETTINGS,a),a.message&&(a.message=_escapeToLC4(a.message)),a.headerData&&(a.headerData=_escapeToLC4(a.headerData)),validateSettings(a);let b={state:initState(a.key),marker:{i:0,j:0}};return a.nonce&&encryptMsg(b,a.nonce,a.verbose),a.headerData&&encryptMsg(b,a.headerData,a.verbose),encryptMsg(b,a.message+(a.signature||""),a.verbose)}export function decrypt(a){a=Object.assign({},DEFAULT_SETTINGS,a),a.headerData&&(a.headerData=_escapeToLC4(a.headerData)),validateSettings(a);let b={state:initState(a.key),marker:{i:0,j:0}};a.nonce&&encryptMsg(b,a.nonce,a.verbose),a.headerData&&encryptMsg(b,a.headerData,a.verbose);let c=decryptMsg(b,a.message,a.verbose);if(a.signature&&!c.endsWith(_escapeToLC4(a.signature)))throw new Error("Invalid signature");return c}export function generateKey(a){return _generateKey(a)}export function generateNonce(a){return _generateNonce(a)}export function escapeToLC4(a){return _escapeToLC4(a)}
//# sourceMappingURL=main.js.map