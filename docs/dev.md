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
    * [.GRIDSIZE](#module_lc4/config.GRIDSIZE)
    * [.DEFAULT_SETTINGS](#module_lc4/config.DEFAULT_SETTINGS)

<a name="module_lc4/config.ALPHABET"></a>

### lc4/config.ALPHABET
LC4 alphabet

**Kind**: static constant of [<code>lc4/config</code>](#module_lc4/config)  
<a name="module_lc4/config.GRIDSIZE"></a>

### lc4/config.GRIDSIZE
LC4 state grid size

**Kind**: static constant of [<code>lc4/config</code>](#module_lc4/config)  
<a name="module_lc4/config.DEFAULT_SETTINGS"></a>

### lc4/config.DEFAULT\_SETTINGS
Default LC4 encryption/decryption settings

**Kind**: static constant of [<code>lc4/config</code>](#module_lc4/config)  
<a name="module_lc4/helpers"></a>

## lc4/helpers

* [lc4/helpers](#module_lc4/helpers)
    * [.escapeToLC4(string)](#module_lc4/helpers.escapeToLC4) ⇒ <code>String</code>
    * [.shuffle(arr)](#module_lc4/helpers.shuffle) ⇒ <code>Array</code>
    * [.randomElement(arr)](#module_lc4/helpers.randomElement) ⇒ <code>\*</code>
    * [.shiftRowRight(state, row, marker)](#module_lc4/helpers.shiftRowRight) ⇒ <code>Array</code>
    * [.shiftColumnDown(state, col, marker)](#module_lc4/helpers.shiftColumnDown) ⇒ <code>Array</code>
    * [.position(char, state)](#module_lc4/helpers.position) ⇒ <code>Array</code>
    * [.printState(state, chara, marker)](#module_lc4/helpers.printState) ⇒ <code>undefined</code>
    * [.validLC4(input)](#module_lc4/helpers.validLC4) ⇒ <code>Boolean</code>

<a name="module_lc4/helpers.escapeToLC4"></a>

### lc4/helpers.escapeToLC4(string) ⇒ <code>String</code>
Escape string to valid LC4 string

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>String</code> - valid LC4 string  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | (invalid) LC4 string |

**Example**  
```js
escapeToLC4("Hello World! This is the 10th test!");

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

### lc4/helpers.shiftRowRight(state, row, marker) ⇒ <code>Array</code>
Shift given row in the state matrix and move the marker if needed

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>Array</code> - updated state matrix  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Array</code> | state matrix |
| row | <code>Number</code> | index of row to shift |
| marker | <code>Object</code> | marker object representing active element |
| marker.i | <code>Number</code> | row of the marker in the state |
| marker.j | <code>Number</code> | column of the marker in the state |

<a name="module_lc4/helpers.shiftColumnDown"></a>

### lc4/helpers.shiftColumnDown(state, col, marker) ⇒ <code>Array</code>
Shift given column in the state matrix and move the marker if needed

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>Array</code> - updated state matrix  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Array</code> | state matrix |
| col | <code>Number</code> | index of column to shift |
| marker | <code>Object</code> | marker object representing active element |
| marker.i | <code>Number</code> | row of the marker in the state |
| marker.j | <code>Number</code> | column of the marker in the state |

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

### lc4/helpers.printState(state, chara, marker) ⇒ <code>undefined</code>
Print out state for verbose mode

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Array</code> | state array to print out |
| chara | <code>Object</code> | input character reference being encrypted/decrypted |
| chara.row | <code>Number</code> | row of input character in the state matrix (-1 for no input character) |
| chara.col | <code>Number</code> | column of input character in the state matrix (-1 for no input character) |
| marker | <code>Object</code> | marker object representing active element |
| marker.i | <code>Number</code> | row of the marker in the state |
| marker.j | <code>Number</code> | column of the marker in the state |

<a name="module_lc4/helpers.validLC4"></a>

### lc4/helpers.validLC4(input) ⇒ <code>Boolean</code>
Determine if input contains only valid LC4 characters

**Kind**: static method of [<code>lc4/helpers</code>](#module_lc4/helpers)  
**Returns**: <code>Boolean</code> - indicating if input is valid LC4  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Array</code> | input array |

<a name="module_lc4/lc4"></a>

## lc4/lc4

* [lc4/lc4](#module_lc4/lc4)
    * [.generateKey([keyword])](#module_lc4/lc4.generateKey) ⇒ <code>String</code>
    * [.generateNonce([length])](#module_lc4/lc4.generateNonce) ⇒ <code>String</code>
    * [.initState(key)](#module_lc4/lc4.initState) ⇒ <code>Array</code>
    * [.encryptMsg(env, msg, [verbose])](#module_lc4/lc4.encryptMsg) ⇒ <code>String</code>
    * [.decryptMsg(env, msg, [verbose])](#module_lc4/lc4.decryptMsg) ⇒ <code>String</code>

<a name="module_lc4/lc4.generateKey"></a>

### lc4/lc4.generateKey([keyword]) ⇒ <code>String</code>
Generate a valid random LC4 key

**Kind**: static method of [<code>lc4/lc4</code>](#module_lc4/lc4)  
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
<a name="module_lc4/lc4.generateNonce"></a>

### lc4/lc4.generateNonce([length]) ⇒ <code>String</code>
Generate a valid random LC4 nonce

**Kind**: static method of [<code>lc4/lc4</code>](#module_lc4/lc4)  
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
<a name="module_lc4/lc4.initState"></a>

### lc4/lc4.initState(key) ⇒ <code>Array</code>
Populate a state matrix by filling in a key row by row

**Kind**: static method of [<code>lc4/lc4</code>](#module_lc4/lc4)  
**Returns**: <code>Array</code> - state matrix  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> \| <code>Key</code> | key string or array |

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
| msg | <code>String</code> |  | ciphertext message |
| [verbose] | <code>Boolean</code> | <code>false</code> | boolean indicating wether verbose mode should be used (will print out intermediate steps) |

<a name="module_lc4"></a>

## lc4

* [lc4](#module_lc4)
    * [.encrypt(settings)](#module_lc4.encrypt) ⇒ <code>String</code>
    * [.decrypt(settings)](#module_lc4.decrypt) ⇒ <code>String</code>
    * [.generateKey([keyword])](#module_lc4.generateKey) ⇒ <code>String</code>
    * [.generateNonce([length])](#module_lc4.generateNonce) ⇒ <code>String</code>
    * [.escapeToLC4(string)](#module_lc4.escapeToLC4) ⇒ <code>String</code>

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
| settings.message | <code>String</code> |  | message to encrypt. Invalid LC4 strings are escaped with the `escapeToLC4` method |
| settings.key | <code>String</code> |  | valid LC4 key |
| [settings.nonce] | <code>String</code> | <code></code> | valid LC4 nonce |
| [settings.headerData] | <code>String</code> | <code></code> | header data |
| [settings.signature] | <code>String</code> | <code></code> | signature for signing the message |
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
**Example** *(Encrypt and sign a message)*  
```js
const { encrypt, generateKey, generateNonce } = require("lc4");

encrypt({
    message: "Lorem Ipsum", // will be escaped to lorem_ipsum
    key: generateKey(),
    nonce: generateNonce(),
    signature: "#secret_signature",
    verbose: true
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
**Example** *(Encrypt and sign a message)*  
```js
const { decrypt } = require("lc4");

decrypt({
    message: "6q4ijz8p_qxbp5ys5w8qg_srnk3r",
    key: "notds7u_i3exc2wlbyzpa4g85#v9fqjkrmh6",
    nonce: "r#39_4kgpz",
    signature: "#secret_signature",
    verbose: true
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
<a name="module_lc4/validate"></a>

## lc4/validate
<a name="module_lc4/validate.validateSettings"></a>

### lc4/validate.validateSettings(settings)
Validate encryption/decryption LC4 settings

**Kind**: static method of [<code>lc4/validate</code>](#module_lc4/validate)  
**Throws**:

- <code>TypeError</code> When message and/or key is missing or if invalid value
(invalid LC4 string) is passed


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| settings | <code>Object</code> |  | LC4 settings message |
| settings.message | <code>String</code> |  | valid LC4 string |
| settings.key | <code>String</code> |  | valid LC4 string |
| [settings.signature] | <code>String</code> | <code></code> | valid LC4 string (at least 10 characters long) |
| [settings.headerData] | <code>String</code> | <code></code> | valid LC4 string |
| [settings.nonce] | <code>String</code> | <code></code> | valid LC4 string (at least 6 characters long) |

