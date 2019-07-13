<a name="module_lc4"></a>

## lc4

* [lc4](#module_lc4)
    * [.encrypt(settings)](#module_lc4.encrypt) ⇒ <code>String</code>
    * [.decrypt(settings)](#module_lc4.decrypt) ⇒ <code>String</code>
    * [.generateKey([mode])](#module_lc4.generateKey) ⇒ <code>String</code>
    * [.generateNonce([mode], [length])](#module_lc4.generateNonce) ⇒ <code>String</code>
    * [.escapeToLC4(string)](#module_lc4.escapeToLC4) ⇒ <code>String</code>
    * [.escapeToLS47(string)](#module_lc4.escapeToLS47) ⇒ <code>String</code>
    * [.escapeString(string, [mode])](#module_lc4.escapeString) ⇒ <code>String</code>

<a name="module_lc4.encrypt"></a>

### lc4.encrypt(settings) ⇒ <code>String</code>
Encrypt a message with LC4 or LS47

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - the encrypted (and signed) message  
**Throws**:

- <code>TypeError</code> Will throw a type error if settings are invalid or
missing


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | encryption settings |
| [settings.mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption algorithm. Can be either "lc4" or "ls47" |
| settings.message | <code>String</code> \| <code>Array</code> |  | message or array of messages to encrypt. Invalid LC4 or LS47 strings are escaped with the `escapeString` method |
| settings.key | <code>String</code> |  | valid LC4 or LS47 key or password; If a password is passed, the key/state will be expanded from the password |
| [settings.nonce] | <code>String</code> | <code></code> | valid LC4 or LS47 nonce (> 5 characters) |
| [settings.headerData] | <code>String</code> | <code></code> | header data |
| [settings.signature] | <code>String</code> | <code></code> | signature for signing the message (> 9 characters) |
| [settings.verbose] | <code>Boolean</code> | <code>false</code> | boolean indicating whether verbose mode should be used (will print intermediate steps to console) |

**Example** *(Encrypt a message with a random key)*  
```js
const { encrypt, generateKey } = require("lc4");

encrypt({
    message: "hello_world",
    key: generateKey(),
    nonce: "lorem_ipsum"
});
```
**Example** *(Encrypt a multiline message with a random key and LS47)*  
```js
const { encrypt, generateKey } = require("lc4");

encrypt({
    message: [ "hello", "ls47" ],
    key: generateKey("ls47"),
    nonce: "lorem_ipsum",
    mode: "ls47"
})
```
**Example** *(Encrypt and sign a message)*  
```js
const { encrypt, generateKey, generateNonce } = require("lc4");

encrypt({
    message: "Lorem Ipsum", // will be escaped to lorem_ipsum
    key: "my_super_secret_password",
    nonce: generateNonce(),
    signature: "#secret_signature",
    verbose: true
});
```
<a name="module_lc4.decrypt"></a>

### lc4.decrypt(settings) ⇒ <code>String</code>
Decrypt a message with LC4 or LS47

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
| [settings.mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | decryption algorithm. Can be either "lc4" or "ls47" |
| settings.message | <code>String</code> \| <code>Array</code> |  | message or array of multiline message to decrypt; When decrypting a multiline message with a signature the signature must be the last element of the array |
| settings.key | <code>String</code> |  | valid LC4 or LS47 key or password; If a password is passed, the key/state will be expanded from the password |
| [settings.nonce] | <code>String</code> | <code></code> | valid LC4 or LS47 nonce (> 5 characters) |
| [settings.headerData] | <code>String</code> | <code></code> | header data |
| [settings.signature] | <code>String</code> | <code></code> | signature of signed message (> 9 characters) |
| [settings.verbose] | <code>Boolean</code> | <code>false</code> | boolean indicating whether verbose mode should be used (will print intermediate steps to console) |

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
**Example** *(Decrypt a message with a given key and LS47)*  
```js
const { decrypt } = require("lc4");

decrypt({
    message: "8.bc-'suz+6l",
    key: "4un)pj0c6(h!ms+_-5q*vkt,zi?9xoglw:18e'.dy/rba73f2",
    mode: "ls47"
})

//=> "hello_world!"
```
**Example** *(Decrypt a multiline, signed message)*  
```js
const { decrypt } = require("lc4");

decrypt({
    message: [ '6q4ij', 'p9597', 'bc8p325u2jc_d9xfw' ],
    key: "notds7u_i3exc2wlbyzpa4g85#v9fqjkrmh6",
    nonce: "r#39_4kgpz",
    signature: "#secret_signature",
    verbose: true
});

//=> ["lorem", "ipsum", "#secret_signature"]
```
<a name="module_lc4.generateKey"></a>

### lc4.generateKey([mode]) ⇒ <code>String</code>
Generate a valid random LC4 or LS47 key

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - a valid LC4 or LS47 key  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption mode. Can be either "lc4" or "ls47" |

**Example** *(Generate a random key)*  
```js
let { generateKey } = require("lc4");

generateKey();
```
**Example** *(Generate a random LS47 key)*  
```js
let { generateKey } = require("lc4");

generateKey("ls47");
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

### lc4.generateNonce([mode], [length]) ⇒ <code>String</code>
Generate a valid random LC4 or LS47 nonce

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - a valid LC4 or LS47 nonce  
**Throws**:

- <code>Error</code> Will throw an error if length is smaller than 6


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption mode. Can be either "lc4" or "ls47" |
| [length] | <code>Number</code> | <code>10</code> | length of nonce (at least 6) |

**Example** *(Generate a random nonce)*  
```js
let { generateNonce } = require("lc4");

generateNonce();
```
**Example** *(Encrypt a message with LS47 and a random nonce)*  
```js
const { encrypt, generateKey, generateNonce } = require("lc4");

encrypt({
    message: "Lorem Ipsum!",
    key: generateKey("ls47"),
    nonce: generateNonce("ls47")
})
```
<a name="module_lc4.escapeToLC4"></a>

### lc4.escapeToLC4(string) ⇒ <code>String</code>
Escape string to valid LC4 string

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - valid LC4 string  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | (invalid) LC4 string |

**Example**  
```js
let { escapeToLC4 } = require("lc4");
escapeToLC4("Hello World! This is the 10th test!");

//=> "hello_world_this_is_the__#th_test"
```
<a name="module_lc4.escapeToLS47"></a>

### lc4.escapeToLS47(string) ⇒ <code>String</code>
Escape string to valid LS47 string

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - valid LS47 string  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | (invalid) LS47 string |

**Example**  
```js
let { escapeToLS47 } = require("lc4");
escapeToLS47("Hello World! This is the 10th test!");

//=> "hello_world!_this_is_the_10th_test!"
```
<a name="module_lc4.escapeString"></a>

### lc4.escapeString(string, [mode]) ⇒ <code>String</code>
Escapes a string to a valid LC4 or LS47 string

**Kind**: static method of [<code>lc4</code>](#module_lc4)  
**Returns**: <code>String</code> - valid LC4 or LS47 string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| string | <code>String</code> |  | (invalid) LC4 or LS47 string |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption mode. Can be either "lc4" or "ls47" |

**Example**  
```js
let { escapeString } = require("lc4");
escapeString("Hello World! This is the 10th test!", "ls47");

//=> "hello_world!_this_is_the_10th_test!"
```
**Example**  
```js
let { escapeString } = require("lc4");
escapeString("Hello World! This is the 10th test!", "lc4");

//=> "hello_world_this_is_the__#th_test"
```
