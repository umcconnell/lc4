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

        it("multiline: should encrypt and sign correctly", () => {
            const str = encrypt({
                message: ["hello", "", "world"],
                signature: "#rubberduck",
                key: "h4lr32jb6ecsykxotn7z#f_vpgdamiwq598u"
            });

            expect(str).to.eql(["ntoti", "", "6a46f", "olebl7e_wen"]);
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

        it("multiline: should encrypt and decrypt correctly", () => {
            const key = generateKey();
            const msg = ["im", "about", "to", "put", "the", "hammer", "down"];

            expect(
                decrypt({
                    message: encrypt({ message: msg, key }),
                    key
                })
            ).to.eql(msg);
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

        it("multiline: should encrypt and decrypt correctly with nonce", () => {
            const key = generateKey();
            const nonce = generateNonce();
            const msg = ["im", "about", "to", "put", "the", "hammer", "down"];

            expect(
                decrypt({
                    message: encrypt({ message: msg, key, nonce }),
                    key,
                    nonce
                })
            ).to.eql(msg);
        });
    });

    describe("Key expansion", () => {
        it("should expand key correctly", () => {
            const msg = "im_about_to_put_the_hammer_down";
            const key = "hello_world";

            expect(
                decrypt({
                    message: encrypt({
                        message: msg,
                        key
                    }),
                    key
                })
            ).to.equal(msg);
        });

        it("multiline: should expand key correctly", () => {
            const msg = ["im", "about", "to", "put", "the", "hammer", "down"];
            const key = "hello_world";

            expect(
                decrypt({
                    message: encrypt({
                        message: msg,
                        key
                    }),
                    key
                })
            ).to.eql(msg);
        });
    });
});
