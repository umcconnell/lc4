import { expect } from "chai";
import { decrypt, encrypt, generateKey, generateNonce } from "../src/main.js";

describe("LC4 encryption and decryption", () => {
    describe("encryption and authentication", () => {
        it("should encrypt and sign correctly", () => {
            const str = encrypt({
                message: "im_about_to_put_the_hammer_down",
                key: "xv7ydq#opaj_39rzut8b45wcsgehmiknf26l",
                nonce: "solwbf",
                signature: "#rubberduck"
            });

            expect(str).to.equal("i2zqpilr2yqgptltrzx2_9fzlmbo3y8_9pyssx8nf2");
        });
    });

    describe("random key", () => {
        it("should encrypt and decrypt correctly", () => {
            const key = generateKey();
            const msg = "im_about_to_put_the_hammer_down";

            expect(
                decrypt({
                    message: encrypt({ message: msg, key }),
                    key
                })
            ).to.equal(msg);
        });
    });

    describe("random key and nonce", () => {
        it("should encrypt and decrypt correctly with nonce", () => {
            const key = generateKey();
            const nonce = generateNonce();
            const msg = "im_about_to_put_the_hammer_down";

            expect(
                decrypt({
                    message: encrypt({ message: msg, key, nonce }),
                    key,
                    nonce
                })
            ).to.equal(msg);
        });
    });
});

describe("LS47 encryption and decryption", () => {
    describe("encryption and authentication", () => {
        it("should encrypt and sign correctly", () => {
            const str = encrypt({
                message: "Im about to put the hammer down!",
                key: "dbmxqa!nzf_e34h/k+.-ugl)9yj*?0:5two26sir1p',7c(8v",
                nonce: "u8:)w5_c!f",
                signature: "__rubberduck",
                mode: "ls47"
            });

            expect(str).to.equal(
                "-erdw!dw52i:6107hcs)l1vu-,'rtova87ktgqrhx.pu"
            );
        });
    });

    describe("random key", () => {
        it("should encrypt and decrypt correctly", () => {
            const key = generateKey(null, "ls47");
            const msg = "im_about_to_put_the_hammer_down";

            expect(
                decrypt({
                    message: encrypt({ message: msg, key, mode: "ls47" }),
                    key,
                    mode: "ls47"
                })
            ).to.equal(msg);
        });
    });

    describe("random key and nonce", () => {
        it("should encrypt and decrypt correctly with nonce", () => {
            const key = generateKey(null, "ls47");
            const nonce = generateNonce(10, "ls47");
            const msg = "im_about_to_put_the_hammer_down";

            expect(
                decrypt({
                    message: encrypt({
                        message: msg,
                        key,
                        nonce,
                        mode: "ls47"
                    }),
                    key,
                    nonce,
                    mode: "ls47"
                })
            ).to.equal(msg);
        });
    });
});

describe("Input validation", () => {
    describe("string passed as input", () => {
        it("should throw at encryption", () => {
            expect(decrypt.bind(null, "hi")).to.throw(TypeError);
        });

        it("should throw at decryption", () => {
            expect(decrypt.bind(null, "hi")).to.throw(TypeError);
        });
    });

    describe("empty object passed", () => {
        it("should throw at encryption", () => {
            expect(encrypt.bind(null, {})).to.throw(TypeError);
        });

        it("should throw at decryption", () => {
            expect(decrypt.bind(null, {})).to.throw(TypeError);
        });
    });

    describe("no message passed", () => {
        it("should throw at encryption", () => {
            expect(encrypt.bind(null, {})).to.throw(TypeError);
        });

        it("should throw at decryption", () => {
            expect(decrypt.bind(null, {})).to.throw(TypeError);
        });
    });

    describe("no key passed", () => {
        it("should throw at encryption", () => {
            expect(encrypt.bind(null, { message: "hi" })).to.throw(TypeError);
        });

        it("should throw at decryption", () => {
            expect(decrypt.bind(null, { message: "hi" })).to.throw(TypeError);
        });
    });

    describe("invalid key passed", () => {
        it("should throw at encryption", () => {
            expect(
                encrypt.bind(null, { message: "hi", key: "invalid" })
            ).to.throw(TypeError);
        });

        it("should throw at decryption", () => {
            expect(
                decrypt.bind(null, { message: "hi", key: "invalid" })
            ).to.throw(TypeError);
        });
    });
});
