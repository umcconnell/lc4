## Modules

<dl>
<dt><a href="#module_lc4/config">lc4/config</a></dt>
<dd></dd>
<dt><a href="#module_lc4/helpers">lc4/helpers</a></dt>
<dd></dd>
<dt><a href="#module_lc4/lc4">lc4/lc4</a></dt>
<dd></dd>
<dt><a href="#module_lc4">lc4</a></dt>
<dd></dd>
<dt><a href="#module_lc4/validate">lc4/validate</a></dt>
<dd></dd>
</dl>

<a name="module_lc4/config"></a>

## lc4/config

* [lc4/config](#module_lc4/config)
    * [.ALPHABET](#module_lc4/config.ALPHABET)
    * [.ALPHABET_LS47](#module_lc4/config.ALPHABET_LS47)
    * [.GRIDSIZE](#module_lc4/config.GRIDSIZE)
    * [.GRIDSIZE_LS47](#module_lc4/config.GRIDSIZE_LS47)
    * [.DEFAULT_SETTINGS](#module_lc4/config.DEFAULT_SETTINGS)

<a name="module_lc4/config.ALPHABET"></a>

### lc4/config.ALPHABET
LC4 alphabet

**Kind**: static constant of [<code>lc4/config</code>](#module_lc4/config)  
<a name="module_lc4/config.ALPHABET_LS47"></a>

### lc4/config.ALPHABET\_LS47
LS47 alphabet

**Kind**: static constant of [<code>lc4/config</code>](#module_lc4/config)  
<a name="module_lc4/config.GRIDSIZE"></a>

### lc4/config.GRIDSIZE
LC4 state grid size

**Kind**: static constant of [<code>lc4/config</code>](#module_lc4/config)  
<a name="module_lc4/config.GRIDSIZE_LS47"></a>

### lc4/config.GRIDSIZE\_LS47
LS47 state grid size

**Kind**: static constant of [<code>lc4/config</code>](#module_lc4/config)  
<a name="module_lc4/config.DEFAULT_SETTINGS"></a>

### lc4/config.DEFAULT\_SETTINGS
Default LC4/LS47 encryption/decryption settings

**Kind**: static constant of [<code>lc4/config</code>](#module_lc4/config)  
<a name="module_lc4/helpers"></a>

## lc4/helpers

* [lc4/helpers](#module_lc4/helpers)
    * [.escapeString(string, [mode])](#module_lc4/helpers.escapeString) ⇒ <code>String</code>
    * [.shuffle(arr)](#module_lc4/helpers.shuffle) ⇒ <code>Array</code>
    * [.randomElement(arr)](#module_lc4/helpers.randomElement) ⇒ <code>\*</code>
    * [.shiftRowRight(state, row, marker, [mode])](#module_lc4/helpers.shiftRowRight) ⇒ <code>Array</code>
    * [.shiftColumnDown(state, col, marker, [mode])](#module_lc4/helpers.shiftColumnDown) ⇒ <code>Array</code>
    * [.position(char, state)](#module_lc4/helpers.position) ⇒ <code>Array</code>
    * [.printState(state, chara, marker, [mode])](#module_lc4/helpers.printState) ⇒ <code>undefined</code>
    * [.validString(input, [mode])](#module_lc4/helpers.validString) ⇒ <code>Boolean</code>

<a name="module_lc4/helpers.escapeString"></a>

### lc4/helpers.escapeString(string, [mode]) ⇒ <code>String</code>
Escape string to valid LC4 or LS47 string

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>String</code> - valid LC4 or LS47 string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| string | <code>String</code> |  | (invalid) LC4 or LS47 string |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | Escape mode (either "lc4" or "ls47") |

**Example**  
```js
escapeString("Hello World! This is the 10th test!");

//=> "hello_world_this_is_the__#th_test"
```
<a name="module_lc4/helpers.shuffle"></a>

### lc4/helpers.shuffle(arr) ⇒ <code>Array</code>
Fisher-Yates array Shuffle

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>Array</code> - shuffled array  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | input array to be shuffled |

<a name="module_lc4/helpers.randomElement"></a>

### lc4/helpers.randomElement(arr) ⇒ <code>\*</code>
Pick a random element from an array

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>\*</code> - a random element from the array  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | input array to pick element from |

<a name="module_lc4/helpers.shiftRowRight"></a>

### lc4/helpers.shiftRowRight(state, row, marker, [mode]) ⇒ <code>Array</code>
Shift given row in the state matrix and move the marker if needed

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>Array</code> - updated state matrix  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| state | <code>Array</code> |  | state matrix |
| row | <code>Number</code> |  | index of row to shift |
| marker | <code>Object</code> |  | marker object representing active element |
| marker.i | <code>Number</code> |  | row of the marker in the state |
| marker.j | <code>Number</code> |  | column of the marker in the state |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/helpers.shiftColumnDown"></a>

### lc4/helpers.shiftColumnDown(state, col, marker, [mode]) ⇒ <code>Array</code>
Shift given column in the state matrix and move the marker if needed

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>Array</code> - updated state matrix  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| state | <code>Array</code> |  | state matrix |
| col | <code>Number</code> |  | index of column to shift |
| marker | <code>Object</code> |  | marker object representing active element |
| marker.i | <code>Number</code> |  | row of the marker in the state |
| marker.j | <code>Number</code> |  | column of the marker in the state |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/helpers.position"></a>

### lc4/helpers.position(char, state) ⇒ <code>Array</code>
Return the coordinates of given search element in the state matrix

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>Array</code> - position vector in the form [`row`, `column`]  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>\*</code> | search element |
| state | <code>Array</code> | state matrix |

<a name="module_lc4/helpers.printState"></a>

### lc4/helpers.printState(state, chara, marker, [mode]) ⇒ <code>undefined</code>
Print out state for verbose mode

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| state | <code>Array</code> |  | state array to print out |
| chara | <code>Object</code> |  | input character reference being encrypted/decrypted |
| chara.row | <code>Number</code> |  | row of input character in the state matrix (-1 for no input character) |
| chara.col | <code>Number</code> |  | column of input character in the state matrix (-1 for no input character) |
| marker | <code>Object</code> |  | marker object representing active element |
| marker.i | <code>Number</code> |  | row of the marker in the state |
| marker.j | <code>Number</code> |  | column of the marker in the state |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/helpers.validString"></a>

### lc4/helpers.validString(input, [mode]) ⇒ <code>Boolean</code>
Determine if input contains only valid LC4 or LS47 characters

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>Boolean</code> - indicating if input is valid LC4 or LS47  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Array</code> |  | input array |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/lc4"></a>

## lc4/lc4

* [lc4/lc4](#module_lc4/lc4)
    * [.generateKey([mode])](#module_lc4/lc4.generateKey) ⇒ <code>String</code>
    * [.generateNonce([mode], [length])](#module_lc4/lc4.generateNonce) ⇒ <code>String</code>
    * [.initState(key, [mode])](#module_lc4/lc4.initState) ⇒ <code>Array</code>
    * [.encryptMsg(env, msg, [verbose])](#module_lc4/lc4.encryptMsg) ⇒ <code>String</code>
    * [.decryptMsg(env, msg, [verbose])](#module_lc4/lc4.decryptMsg) ⇒ <code>String</code>

<a name="module_lc4/lc4.generateKey"></a>

### lc4/lc4.generateKey([mode]) ⇒ <code>String</code>
Generate a valid random LC4 or LS47 key

**Kind**: static method of [<code>lc4/lc4</code>](#module_lc4/lc4)  
**Returns**: <code>String</code> - a valid LC4 or LS47 key  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

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
<a name="module_lc4/lc4.generateNonce"></a>

### lc4/lc4.generateNonce([mode], [length]) ⇒ <code>String</code>
Generate a valid random LC4 or LS47 nonce

**Kind**: static method of [<code>lc4/lc4</code>](#module_lc4/lc4)  
**Returns**: <code>String</code> - a valid LC4 or LS47 nonce  
**Throws**:

- <code>Error</code> Will throw an error if length is smaller than 6


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |
| [length] | <code>Number</code> | <code>10</code> | length of nonce (at least 6) |

**Example** *(Generate a random nonce)*  
```js
let { generateNonce } = require("lc4");

generateNonce();
```
**Example** *(Generate a random LS47 nonce)*  
```js
let { generateNonce } = require("lc4");

generateNonce("ls47");
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
<a name="module_lc4/lc4.initState"></a>

### lc4/lc4.initState(key, [mode]) ⇒ <code>Array</code>
Populate a state matrix by filling in a key row by row or by expanding a key

**Kind**: static method of [<code>lc4/lc4</code>](#module_lc4/lc4)  
**Returns**: <code>Array</code> - state matrix  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>String</code> \| <code>Array</code> |  | key string or array |
| [mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/lc4.encryptMsg"></a>

### lc4/lc4.encryptMsg(env, msg, [verbose]) ⇒ <code>String</code>
Encrypt a cleartext message and change the environment

**Kind**: static method of [<code>lc4/lc4</code>](#module_lc4/lc4)  
**Returns**: <code>String</code> - ciphertext message  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| env | <code>Object</code> |  | environment object |
| env.state | <code>Array</code> |  | state matrix |
| env.marker | <code>Object</code> |  | marker object representing active element |
| env.marker.i | <code>Number</code> |  | row of the marker in the state |
| env.marker.j | <code>Number</code> |  | column of the marker in the state |
| env.mode | <code>String</code> |  | encryption algorithm. Can be either "lc4" or "ls47" |
| msg | <code>String</code> |  | cleartext message |
| [verbose] | <code>Boolean</code> | <code>false</code> | boolean indicating wether verbose mode should be used (will print out intermediate steps) |

<a name="module_lc4/lc4.decryptMsg"></a>

### lc4/lc4.decryptMsg(env, msg, [verbose]) ⇒ <code>String</code>
Decrypt a ciphertext message and change the environment

**Kind**: static method of [<code>lc4/lc4</code>](#module_lc4/lc4)  
**Returns**: <code>String</code> - cleartext message  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| env | <code>Object</code> |  | environment object |
| env.state | <code>Array</code> |  | state matrix |
| env.marker | <code>Object</code> |  | marker object representing active element |
| env.marker.i | <code>Number</code> |  | row of the marker in the state |
| env.marker.j | <code>Number</code> |  | column of the marker in the state |
| env.mode | <code>Strin</code> |  | decryption algorithm. Can be either "lc4" or "ls47" |
| msg | <code>String</code> |  | ciphertext message |
| [verbose] | <code>Boolean</code> | <code>false</code> | boolean indicating wether verbose mode should be used (will print out intermediate steps) |

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
<a name="module_lc4/validate"></a>

## lc4/validate

* [lc4/validate](#module_lc4/validate)
    * [.validateMode(settings)](#module_lc4/validate.validateMode) ⇒ <code>undefined</code>
    * [.validateMsg(settings)](#module_lc4/validate.validateMsg) ⇒ <code>undefined</code>
    * [.validateHeaderData(settings)](#module_lc4/validate.validateHeaderData) ⇒ <code>undefined</code>
    * [.validateKey(settings)](#module_lc4/validate.validateKey) ⇒ <code>undefined</code>
    * [.validateNonce(settings)](#module_lc4/validate.validateNonce) ⇒ <code>undefined</code>
    * [.validateSignature(settings)](#module_lc4/validate.validateSignature) ⇒ <code>undefined</code>
    * [.validateSettings(settings)](#module_lc4/validate.validateSettings) ⇒ <code>undefined</code>

<a name="module_lc4/validate.validateMode"></a>

### lc4/validate.validateMode(settings) ⇒ <code>undefined</code>
Validates the mode option of the settings

**Kind**: static method of [<code>lc4/validate</code>](#module_lc4/validate)  
**Throws**:

- <code>TypeError</code> when settings.mode is invalid


| Param | Type | Description |
| --- | --- | --- |
| settings | <code>Object</code> | settings object |
| settings.mode | <code>String</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/validate.validateMsg"></a>

### lc4/validate.validateMsg(settings) ⇒ <code>undefined</code>
Validates the message of the settings

**Kind**: static method of [<code>lc4/validate</code>](#module_lc4/validate)  
**Throws**:

- <code>TypeError</code> when no message is specified or the message is invalid


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | settings object |
| settings.message | <code>String</code> \| <code>Array</code> |  | valid LC4 or LS47 message or array of valid strings |
| [settings.mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/validate.validateHeaderData"></a>

### lc4/validate.validateHeaderData(settings) ⇒ <code>undefined</code>
Validates the headerDate option of the settings

**Kind**: static method of [<code>lc4/validate</code>](#module_lc4/validate)  
**Throws**:

- <code>TypeError</code> when header data is specified but contains illegal
characters


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | settings object |
| [settings.headerData] | <code>String</code> | <code></code> | optional valid header data |
| [settings.mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/validate.validateKey"></a>

### lc4/validate.validateKey(settings) ⇒ <code>undefined</code>
Validates the key of the settings

**Kind**: static method of [<code>lc4/validate</code>](#module_lc4/validate)  
**Throws**:

- <code>TypeError</code> when key is not specified, too short or contains illegal
characters


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | settings object |
| settings.key | <code>String</code> |  | valid key (no illegal characters, no duplicate characters if as long as alphabet) or password |
| [settings.mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/validate.validateNonce"></a>

### lc4/validate.validateNonce(settings) ⇒ <code>undefined</code>
Validates nonce option of the settings

**Kind**: static method of [<code>lc4/validate</code>](#module_lc4/validate)  
**Throws**:

- <code>TypeError</code> when nonce is specified and too short (< 6 characters) or
contains illegal characters


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | settings object |
| [settings.nonce] | <code>String</code> | <code></code> | optional valid nonce |
| [settings.mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/validate.validateSignature"></a>

### lc4/validate.validateSignature(settings) ⇒ <code>undefined</code>
Validates signature option of the settings

**Kind**: static method of [<code>lc4/validate</code>](#module_lc4/validate)  
**Throws**:

- <code>TypeError</code> when signature is specified and too short (< 10
characters) or contains illegal characters


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | settings object |
| [settings.signature] | <code>String</code> | <code></code> | optional valid signature |
| [settings.mode] | <code>String</code> | <code>&quot;lc4&quot;</code> | encryption/decryption algorithm. Can be either "lc4" or "ls47" |

<a name="module_lc4/validate.validateSettings"></a>

### lc4/validate.validateSettings(settings) ⇒ <code>undefined</code>
Validate encryption/decryption LC4 settings

**Kind**: static method of [<code>lc4/validate</code>](#module_lc4/validate)  
**Throws**:

- <code>TypeError</code> When message and/or key and/or mode is missing or if
invalid value (invalid LC4 or LS47 string) is passed


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | LC4 settings message |
| settings.mode | <code>String</code> |  | encryption/decryption algorithm. Can be either "lc4" or "ls47" |
| settings.message | <code>String</code> |  | valid LC4 or LS47 string |
| settings.key | <code>String</code> |  | valid LC4 or LS47 string |
| [settings.signature] | <code>String</code> | <code></code> | valid LC4 or LS47 string (at least 10 characters long) |
| [settings.headerData] | <code>String</code> | <code></code> | valid LC4 or LS47 string |
| [settings.nonce] | <code>String</code> | <code></code> | valid LC4 or LS47 string (at least 6 characters long) |

