import { expect } from "chai";
import { decrypt, encrypt } from "../src/main.js";

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
                encrypt.bind(null, {
                    message: "hi",
                    // Duplicate "r"
                    key: "rruoq8_slktcf7h9xbj#vg24m5ie6ad3ynpw"
                })
            ).to.throw(TypeError);

            expect(
                encrypt.bind(null, {
                    message: "hi",
                    // Duplicate "0"
                    key: "00cdsgj:74('bk6m!nxlq23-*wae.v89p?/_5zfhr1uo+),ty",
                    mode: "ls47"
                })
            );
        });

        it("should throw at decryption", () => {
            expect(
                decrypt.bind(null, {
                    message: "hi",
                    // Duplicate "l"
                    key: "ll6mxhzsd2y3bqrij7onkgav#w9pect8f4_u"
                })
            ).to.throw(TypeError);

            expect(
                decrypt.bind(null, {
                    message: "hi",
                    // Duplicate "4"
                    key: "440e38)1xvn6bk2,-w'rt(dgl/mfq_!a+husyz795?j:ipc.o",
                    mode: "ls47"
                })
            );
        });
    });
});
