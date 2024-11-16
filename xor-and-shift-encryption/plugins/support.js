'use strict'

const fp = require('fastify-plugin')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {

    fastify.decorate('utf8ToBase64', function (data) {
        return Buffer.from(data).toString('base64');
    })

    fastify.decorate('base64ToUtf8', function (data) {
        return Buffer.from(data, 'base64').toString('ascii');
    })

    fastify.decorate('shiftCipherDecryption', function (encrypted) {
        const decrypteds = {};
        let tmp, ch;

        for (let i = 1; i <= 26; i++) {
            tmp = '';
            for (let index in encrypted) {
                ch = encrypted[index];
                tmp += String.fromCharCode(65 + (ch.toUpperCase().charCodeAt(0) - 65 + i) % 26)
            }
            decrypteds[26 - i] = tmp;
        }

        return decrypteds;
    })

    fastify.decorate('shiftCipherEncryption', function (data, round) {
        round %= 26;
        let encrypted = '';

        for (let index in data)
            encrypted += String.fromCharCode(65 + (data[index].toUpperCase().charCodeAt(0) - 65 + round) % 26);

        return encrypted;
    })

    fastify.decorate('stringToHexString', function (data, delimiter = ' ') {
        const digitToHex = (char) => {
            const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            let num = char.charCodeAt(0);
            return num > 15 ? digits[~~(num / 16)] + '' + digits[num % 16] : digits[num];
        }

        let str = '';
        if (data.length)
            str += digitToHex(data[0]);
        for (let index = 1; index < data.length; index++)
            str += ' ' + digitToHex(data[index]);
        return str;
    })

    fastify.decorate('hexStringToString', function (data, delimiter = ' ') {
        const hexToChar = (hex) => {
            const digitToNum = (digit) => {
                return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].indexOf(digit);
            }
            if (hex.length === 1)
                return String.fromCharCode(digitToNum(hex) * 1);
            return String.fromCharCode(digitToNum(hex[0]) * 16 + digitToNum(hex[1]) * 1);
        };
        const hexs = data.split(delimiter);
        let str = '';
        for (let index in hexs)
            str += hexToChar(hexs[index]);
        return str;

    })

    fastify.decorate('simpleXorDecryption', function (encrypted) {
        const decrypteds = {};
        let tmp;
        for (let i = 1; i < 256; i++) {
            tmp = '';
            for (let index in encrypted)
                tmp += String.fromCharCode(encrypted[index].charCodeAt(0) ^ i);
            decrypteds[i] = tmp;
        }
        return decrypteds;
    })

    fastify.decorate('simpleXorEncryption', function (data, xorValue) {
        xorValue %= 256;
        let encrypted = '';

        for (let index in data)
            encrypted += String.fromCharCode(data[index].charCodeAt(0) ^ xorValue);

        return encrypted;
    })

    // fastify.decorate('desEcbEncryption2', function (data, key) {
    //     const leftCircularShift = (bits, count) => {
    //         let newBits = bits.slice(), first;
    //         for (let j = 0; j < count; j++) {
    //             first = newBits[0];
    //             for (let i = 0; i < bits.length - 1; i++)
    //                 newBits[i - 1] = newBits[i];
    //             newBits[bits.length - 1] = first;
    //         }
    //         return newBits;
    //     }
    //
    //     const bufferToArray = (buffer) => {
    //         let array = [];
    //         for (data of buffer.values()) array.push(data);
    //         return array;
    //     }
    //
    //     const setBitsBlock = (bits, block, index) => {
    //         for (let i = 0; i < 64; i++)
    //             bits[i + 64 * index] = block[i];
    //         return bits;
    //     }
    //
    //     const getBitsBlock = (bits, index) => {
    //         const block = [];
    //         for (let i = 0; i < 64; i++)
    //             block.push(bits[i + 64 * index]);
    //         return block;
    //     }
    //
    //     const bitsBlockLength = (bits) => {
    //         return bits.length / 64;
    //     }
    //
    //     const byteToBits = (byte) => {
    //         const bits = [];
    //
    //         for (var i = 128; i >= 1; i /= 2)
    //             bits.push(byte & i ? 1 : 0)
    //
    //         return bits;
    //     }
    //
    //     const bytesToBits = (bytes) => {
    //         const bits = [];
    //
    //         for (let i = 0; i < bytes.length; i++)
    //             bits.concat(byteToBits(bytes[i]));
    //
    //         return bits;
    //     }
    //
    //     const permFunction = (block, perm) => {
    //         const bits = bytesToBits(block);
    //         const newBits = [];
    //         for (let i = 0; i < perm.length; i++)
    //             newBits.push(bits[perm[i]]);
    //
    //         return newBits;
    //     }
    //
    //     const permFunctionOnBits = (bits, perm) => {
    //         const loopLength = bitsBlockLength(bits);
    //         for (let i = 0; i < loopLength; i++)
    //             setBitsBlock(bits, permFunction(getBitsBlock(bits, i), perm), i);
    //         return bits;
    //     }
    //
    //     const generateKeys = (key, round) => {
    //         const oneBitShift = [0, 1, 8, 15];
    //         const parityDropPerm = [
    //             56, 48, 40, 32, 24, 16, 8, 0, 57, 49,
    //             41, 33, 25, 17, 9, 1, 58, 50, 42, 34,
    //             26, 18, 10, 2, 59, 51, 43, 35, 62, 54,
    //             46, 38, 30, 22, 14, 6, 61, 53, 45, 37,
    //             29, 21, 13, 5, 60, 52, 44, 36, 28, 20,
    //             12, 4, 27, 19, 11, 3
    //         ];
    //         const keyCompPerm = [
    //             13, 16, 10, 23, 0, 4, 2, 27, 14, 5,
    //             20, 9, 22, 18, 11, 3, 25, 7, 15, 6,
    //             26, 19, 12, 1, 40, 51, 30, 36, 46, 54,
    //             29, 39, 50, 44, 32, 47, 43, 48, 38, 55,
    //             33, 52, 45, 41, 49, 35, 28, 31
    //         ];
    //
    //         let copyKey = permFunction(key.slice(), parityDropPerm);
    //         let left,right,tmpKey;
    //
    //         const keys = [];
    //
    //         for (let i = 0; i < 16; i++) {
    //             left = leftCircularShift(copyKey.slice(0, 28), (i in oneBitShift ? 1 : 2));
    //             right = leftCircularShift(copyKey.slice(28, 56), (i in oneBitShift ? 1 : 2));
    //             tmpKey = [...left,...right];
    //             keys.push(permFunction(tmpKey, keyCompPerm));
    //         }
    //         return keys;
    //
    //
    //     }
    //
    //     const ip = [57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
    //         61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7,
    //         56, 48, 40, 32, 24, 16, 8, 0, 58, 50, 42, 34, 26, 18, 10, 2,
    //         60, 33, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6
    //     ];
    //
    //     const fp = [
    //         39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46,
    //         14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21,
    //         61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35,
    //         3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10,
    //         50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57,
    //         25, 32, 0, 40, 8, 48, 16, 56, 24
    //     ];
    //
    //     const dataBits = expandBits(bytesToBits(bufferToArray(Buffer.from(data, 'utf8'))), 64);
    //
    //     permFunctionOnBits(dataBits, ip);
    //
    //     const keyBits = expandBits(bytesToBits(bufferToArray(Buffer.from(data, 'utf8'))), 64, 64);
    //
    //
    //     permFunctionOnBits(dataBits, fp);
    //
    // })

    fastify.decorate('desEcbEncryption', function (data, key) {
        const constants = {
            ip : [57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
                61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7,
                56, 48, 40, 32, 24, 16, 8, 0, 58, 50, 42, 34, 26, 18, 10, 2,
                60, 33, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6
            ],

            fp : [
                39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46,
                14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21,
                61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35,
                3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10,
                50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57,
                25, 32, 0, 40, 8, 48, 16, 56, 24
            ],

            parityBitDrop : [
                56, 48, 40, 32, 24, 16, 8, 0, 57, 49,
                41, 33, 25, 17, 9, 1, 58, 50, 42, 34,
                26, 18, 10, 2, 59, 51, 43, 35, 62, 54,
                46, 38, 30, 22, 14, 6, 61, 53, 45, 37,
                29, 21, 13, 5, 60, 52, 44, 36, 28, 20,
                12, 4, 27, 19, 11, 3
            ],

            keyCompression : [
                13, 16, 10, 23, 0, 4, 2, 27, 14, 5,
                20, 9, 22, 18, 11, 3, 25, 7, 15, 6,
                26, 19, 12, 1, 40, 51, 30, 36, 46, 54,
                29, 39, 50, 44, 32, 47, 43, 48, 38, 55,
                33, 52, 45, 41, 49, 35, 28, 31
            ],

            oneBitShiftOfKey : [0, 1, 8, 15],
        };

        const leftCircularShift = (bits, count) => {
            let newBits = bits.slice(), first;

            for (let j = 0; j < count; j++) {
                first = newBits[0];
                for (let i = 0; i < bits.length - 1; i++)
                    newBits[i - 1] = newBits[i];
                newBits[bits.length - 1] = first;
            }

            return newBits;
        }

        const permFunction = (bits, perm) => {
            const newBits = [];

            for (let i = 0; i < perm.length; i++)
                newBits.push(bits[perm[i]]);

            return newBits;
        }

        const expandBits = (bits, dividalbeBy, maxLen = undefined) => {
            const reminder = bits.length % dividalbeBy;
            const newBits = bits.slice();

            if(reminder){
                const extension = dividalbeBy - reminder;
                for (let i = 0; i < extension; i++)
                    newBits.push(0);
            }
            return (newBits.length > maxLen) ? newBits.slice(0, maxLen) : newBits;

        }

        const generateKeys = (key, round) => {
            const keys = [];

            const permuted = permFunction(key, constants.parityBitDrop);

            let left=permuted.slice(0, 28);
            let right=permuted.slice(28, 56);
            let generatedKey;

            for (let i = 0; i < 16; i++) {
                left = leftCircularShift(left, (i in constants.oneBitShiftOfKey ? 1 : 2));
                right = leftCircularShift(right, (i in constants.oneBitShiftOfKey ? 1 : 2));

                keys.push(permFunction([...left,...right], constants.keyCompression));
            }

            return keys;


        }


    })
})
