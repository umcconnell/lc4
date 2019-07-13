import { expect } from "chai";
import { decrypt, encrypt, generateKey, generateNonce } from "../src/main.js";

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

        it("multiline: should encrypt and sign correctly", () => {
            const str = encrypt({
                message: ["Im about to put", "", "the hammer down!"],
                key: "dbmxqa!nzf_e34h/k+.-ugl)9yj*?0:5two26sir1p',7c(8v",
                nonce: "u8:)w5_c!f",
                signature: "__rubberduck",
                mode: "ls47"
            });

            expect(str).to.eql([
                "-erdw!dw52i:610",
                "",
                "+.,xt7?ols981sgp",
                "?rhm(/8rfy?."
            ]);
        });
    });

    describe("random key", () => {
        it("should encrypt and decrypt correctly", () => {
            const key = generateKey("ls47");
            const msg = "im_about_to_put_the_hammer_down";

            expect(
                decrypt({
                    message: encrypt({ message: msg, key, mode: "ls47" }),
                    key,
                    mode: "ls47"
                })
            ).to.equal(msg);
        });

        it("multiline: should encrypt and decrypt correctly", () => {
            const key = generateKey("ls47");
            const msg = ["im", "about", "to", "put", "the", "hammer", "down"];

            expect(
                decrypt({
                    message: encrypt({ message: msg, key, mode: "ls47" }),
                    key,
                    mode: "ls47"
                })
            ).to.eql(msg);
        });
    });

    describe("random key and nonce", () => {
        it("should encrypt and decrypt correctly with nonce", () => {
            const key = generateKey("ls47");
            const nonce = generateNonce("ls47");
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

        it("multiline: should encrypt and decrypt correctly with nonce", () => {
            const key = generateKey("ls47");
            const nonce = generateNonce("ls47");
            const msg = ["im", "about", "to", "put", "the", "hammer", "down"];

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
                        key,
                        mode: "ls47"
                    }),
                    key,
                    mode: "ls47"
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
                        key,
                        mode: "ls47"
                    }),
                    key,
                    mode: "ls47"
                })
            ).to.eql(msg);
        });
    });
});
