# lc4

[![NPM](https://nodei.co/npm/lc4.png)](https://nodei.co/npm/lc4/)

[![](https://data.jsdelivr.com/v1/package/gh/umcconnell/lc4/badge)](https://www.jsdelivr.com/package/gh/umcconnell/lc4)

A [spec-compliant](https://eprint.iacr.org/2017/339.pdf)
LC4 (ElsieFour) and LS47 encryption/decryption library

## Table of Contents

-   [Installing](#installing)
-   [Examples](#examples)
-   [About](#about)
-   [Docs](#docs)
-   [Built With](#built-with)
-   [Contributing](#contributing)
-   [Versioning](#versioning)
-   [Authors](#authors)
-   [License](#license)
-   [Acknowledgments](#acknowledgments)
-   [See Also](#see-also)

## Installing

Install with npm:

```bash
npm install lc4
```

And include in node:

```js
let lc4 = require("lc4");
```

Or use in the browser with jsDelivr:

```html
<script type="module">
    import * as lc4 from "https://cdn.jsdelivr.net/gh/umcconnell/lc4/dist/main.js";

    // Your code here...
</script>
```

**Note:**

> If you use lc4 in the browser, replace
>
> ```js
> let { ... } = require("lc4");
> ```
>
> with
>
> ```js
> import { ... } from "https://cdn.jsdelivr.net/gh/umcconnell/lc4/dist/main.js";
> ```

## Examples

Encrypt a message with a random key:

```js
let { encrypt, generateKey } = require("lc4");

encrypt({
    message: "Hello World",
    key: generateKey()
});
```

Encrypt a message with a password using LS47:

```js
let { encrypt, generateKey } = require("lc4");

encrypt({
    message: "Hello World!",
    key: "my_super_secret_password",
    mode: "ls47"
}):
```

**Note:**

> When using a password instead of a key, make sure the password is long enough
> to ensure high enough entropy.

Encrypt a message and sign it:

```js
let { encrypt, generateKey, generateNonce } = require("lc4");

encrypt({
    message: "Lorem Ipsum",
    key: generateKey(),
    nonce: generateNonce(),
    signature: "#rubberduck"
});
```

Encrypt a multiline message:

```js
let { encrypt, generateKey, generateNonce } = require("lc4");

let msg = "Hello\nWorld";

encrypt({
    message: msg.split("\n"),
    key: generateKey(),
    nonce: generateNonce(),
    signature: "__mySignature"
});
```

**Note:**

> To encrypt or decrypt a multiline text, just pass an array of lines as
> message.

Decrypt a message:

```js
const { decrypt } = require("lc4");

decrypt({
    message: "v74hxj5pxmo",
    key: "igqehmd48pvxrl7k36y95j2sfnbo#wc_ztau",
    nonce: "lorem_ipsum"
});

//=> "hello_world"
```

Decrypt a signed message:

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

## About

### LC4

> ElsieFour (LC4) is a low-tech cipher that can be computed by hand;but unlike
> many historical ciphers, LC4 is designed to be hard to break. LC4 is intended
> for encrypted communication between humans only, and therefore it encrypts
> and decrypts plaintexts and ciphertexts consisting only of the English letters
> A through Z plus a few other characters. LC4 uses a nonce in addition to the
> secret key, and requires that different messages use unique nonces. LC4
> performs authenticated encryption, and optional header data can be included in
> the authentication.

The LC4 alphabet consists of following characters:
`#_23456789abcdefghijklmnopqrstuvwxyz`

A LC4 key is a permutation of the alphabet that is then represented in a 6x6
grid used for the encryption or decryption.

For a tutorial on how to encrypt and decrypt a message by hand using the LC4
algorithm, see the [white paper](https://eprint.iacr.org/2017/339.pdf#page=12).

### LS47

> This is a slight improvement of the ElsieFour cipher as described by Alan
> Kaminsky [1]. We use 7x7 characters instead of original (barely fitting) 6x6,
> to be able to encrypt some structured information. We also describe a simple
> key-expansion algorithm, because remembering passwords is popular. Similar
> security considerations as with ElsieFour hold.

The LS47 alphabet consists of following characters:
`_abcdefghijklmnopqrstuvwxyz.0123456789,-+*/:?!'()`

A LS47 key is a permutation of the alphabet that is then represented in a 7x7
grid used for the encryption or decryption.

For a tutorial on how to encrypt and decrypt a message by hand using the LS47
algorithm, see the [white paper](https://gitea.blesmrt.net/exa/ls47).

## Docs

See the [docs](docs/docs.md) for more information and examples.

For more information about internal mechanisms and helpers, see the
[dev docs](docs/dev.md).

## Built With

-   [babel](https://babeljs.io/) - The js transpiler
-   [mocha](https://mochajs.org/) - The test framework
-   [chai](https://www.chaijs.com/) - The assertion framework
-   [jsdoc2md](https://github.com/jsdoc2md/jsdoc-to-markdown) - The
    documentation generator

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of
conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available,
see the [tags on this repository](https://github.com/umcconnell/lc4/tags).

## Authors

Ulysse McConnell - [umcconnell](https://github.com/umcconnell/)

See also the list of
[contributors](https://github.com/umcconnell/lc4/contributors)
who participated in this project.

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

-   [reddit r/dailyprogrammer](https://www.reddit.com/r/dailyprogrammer/comments/8jvbzg/20180516_challenge_361_intermediate_elsiefour/)

## See Also

Find the specifications here:

-   LC4 https://eprint.iacr.org/2017/339.pdf
-   LS47 https://gitea.blesmrt.net/exa/ls47

Check out these other LC4 implementations and LC4 variants:

-   Python https://github.com/dstein64/LC4
-   JS https://github.com/Gavin-Song/elsie-four-cipher
-   Go https://github.com/tonetheman/golang_lc4
-   LS47 https://gitea.blesmrt.net/exa/ls47
