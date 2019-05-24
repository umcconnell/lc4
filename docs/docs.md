<a name="module_lc4"></a>

## lc4

* [lc4](#module_lc4)
    * [.encrypt(settings)](#module_lc4.encrypt) ⇒ <code>String</code>
    * [.decrypt(settings)](#module_lc4.decrypt) ⇒ <code>String</code>
    * [.generateKey([keyword])](#module_lc4.generateKey) ⇒ <code>String</code>
    * [.generateNonce([length])](#module_lc4.generateNonce) ⇒ <code>String</code>

<a name="module_lc4.encrypt"></a>

### lc4.encrypt(settings) ⇒ <code>String</code>
Encrypt a message with LC4

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - the encrypted (and signed) message  
**Throws**:

- <code>TypeError</code> Will throw a type error if settings are invalid or
missing


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | encryption settings |
| settings.message | <code>String</code> |  | message to encrypt. Invalid LC4 strings are escaped |
| settings.key | <code>String</code> |  | valid LC4 key |
| [settings.nonce] | <code>String</code> | <code></code> | valid LC4 nonce |
| [settings.headerData] | <code>String</code> | <code></code> | header data |
| [settings.signature] | <code>String</code> | <code></code> | signature for signing the message |

**Example** *(Encrypt a message with a random key)*  
```js
const { encrypt, generateKey } = require("lc4");

encrypt({
    message: "hello_world",
    key: generateKey(),
    nonce: "lorem_ipsum"
});
```
**Example** *(Encrypt and sign a message)*  
```js
const { encrypt, generateKey, generateNonce } = require("lc4");

encrypt({
    message: "Lorem Ipsum", // will be escaped to lorem_ipsum
    key: generateKey(),
    nonce: generateNonce(),
    signature: "#secret_signature"
});
```
<a name="module_lc4.decrypt"></a>

### lc4.decrypt(settings) ⇒ <code>String</code>
Decrypt a message with LC4

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - the encrypted (and signed) message  
**Throws**:

- <code>Error</code> Will throw error "Invalid Signature" if message doesn't end
with specified signature
- <code>TypeError</code> Will throw a type error if settings are invalid or
missing


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | decryption settings |
| settings.message | <code>String</code> |  | message to decrypt |
| settings.key | <code>String</code> |  | valid LC4 key |
| [settings.nonce] | <code>String</code> | <code></code> | valid LC4 nonce |
| [settings.headerData] | <code>String</code> | <code></code> | header data |
| [settings.signature] | <code>String</code> | <code></code> | signature of signed message |

**Example** *(Decrypt a message with a given key)*  
```js
const { decrypt } = require("lc4");

decrypt({
    message: "v74hxj5pxmo",
    key: "igqehmd48pvxrl7k36y95j2sfnbo#wc_ztau",
    nonce: "lorem_ipsum"
});

//=> "hello_world"
```
**Example** *(Encrypt and sign a message)*  
```js
const { decrypt } = require("lc4");

decrypt({
    message: "6q4ijz8p_qxbp5ys5w8qg_srnk3r",
    key: "notds7u_i3exc2wlbyzpa4g85#v9fqjkrmh6",
    nonce: "r#39_4kgpz",
    signature: "#secret_signature"
});

//=> "lorem_ipsum#secret_signature"
```
<a name="module_lc4.generateKey"></a>

### lc4.generateKey([keyword]) ⇒ <code>String</code>
Generate a valid random LC4 key

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - a valid LC4 key  
**Throws**:

- <code>Error</code> Will throw an error if the keyword contains invalid LC4
characters


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [keyword] | <code>String</code> | <code>false</code> | keyword to base key off (less secure) |

**Example** *(Generate a random key)*  
```js
let { generateKey } = require("lc4");

generateKey();
```
**Example** *(Encrypt a message with a random key)*  
```js
const { encrypt, generateKey } = require("lc4");

encrypt({
    message: "hello_world",
    key: generateKey(),
});
```
<a name="module_lc4.generateNonce"></a>

### lc4.generateNonce([length]) ⇒ <code>String</code>
Generate a valid random LC4 nonce

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - a valid LC4 nonce  
**Throws**:

- <code>Error</code> Will throw an error if length is smaller than 6


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [length] | <code>Number</code> | <code>10</code> | length of nonce (at least 6) |

**Example** *(Generate a random nonce)*  
```js
let { generateNonce } = require("lc4");

generateNonce();
```
**Example** *(Encrypt a message with a random nonce)*  
```js
const { encrypt, generateKey, generateNonce } = require("lc4");

encrypt({
    message: "Lorem Ipsum",
    key: generateKey(),
    nonce: generateNonce()
})
```
