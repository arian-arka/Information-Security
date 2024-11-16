'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        return reply.view('/view/pages/index.ejs');
    })

    fastify.get('/test', async function (request, reply) {
        const constants = {
            ip: [
                57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
                61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7,
                56, 48, 40, 32, 24, 16, 8, 0, 58, 50, 42, 34, 26, 18, 10, 2,
                60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6
            ],

            fp: [
                39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46,
                14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21,
                61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35,
                3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10,
                50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57,
                25, 32, 0, 40, 8, 48, 16, 56, 24
            ],

            parityBitDrop: [
                56, 48, 40, 32, 24, 16, 8, 0, 57, 49,
                41, 33, 25, 17, 9, 1, 58, 50, 42, 34,
                26, 18, 10, 2, 59, 51, 43, 35, 62, 54,
                46, 38, 30, 22, 14, 6, 61, 53, 45, 37,
                29, 21, 13, 5, 60, 52, 44, 36, 28, 20,
                12, 4, 27, 19, 11, 3
            ],

            keyCompression: [
                13, 16, 10, 23, 0, 4, 2, 27, 14, 5,
                20, 9, 22, 18, 11, 3, 25, 7, 15, 6,
                26, 19, 12, 1, 40, 51, 30, 36, 46, 54,
                29, 39, 50, 44, 32, 47, 43, 48, 38, 55,
                33, 52, 45, 41, 49, 35, 28, 31
            ],

            eBit: [
                31, 0, 1, 2, 3, 4,
                3, 4, 5, 6, 7, 8,
                7, 8, 9, 10, 11, 12,
                11, 12, 13, 14, 15, 16,
                15, 16, 17, 18, 19, 20,
                19, 20, 21, 22, 23, 24,
                23, 24, 25, 26, 27, 28,
                27, 28, 29, 30, 31, 0
            ],

            sBoxes: [
                [
                    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
                    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
                    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
                    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
                ],

                [
                    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
                    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
                    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
                    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
                ],

                [
                    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
                    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
                    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
                    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
                ],

                [
                    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
                    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
                    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
                    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
                ],

                [
                    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
                    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
                    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
                    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
                ],

                [
                    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
                    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
                    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
                    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
                ],

                [
                    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
                    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
                    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
                    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
                ],

                [
                    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
                    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
                    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
                    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
                ]
            ],

            p: [15, 6, 19, 20, 28, 11, 27, 16, 0, 14, 22, 25, 4, 17, 30, 9, 1, 7, 23, 13, 31, 26, 2, 8, 18, 12, 29, 5, 21, 10, 3, 24],

            oneBitShiftOfKey: [0, 1, 8, 15],
        };

        const addToBinary = (block1, block2) => {
            const result = block1.slice(), loopLength = block2.length;
            let carry = 0;
            for (let i = loopLength - 1; i > -1; i--) {
                result[i] += block2[i] + carry;
                if (result[i] > 1) {
                    carry = 1;
                    result[i] = result[i] === 2 ? 0 : 1;
                } else
                    carry = 0;
            }
            return result;
        }

        const sBoxes = (block48Bits) => {
            let block32Bits = [];
            let tmp;
            for (let i = 0; i < 8; i++) {
                tmp = getBitsBlock(block48Bits, i, 6);
                //console.log('@', tmp[0] + '' + tmp[5], '' + tmp.slice(1, 5).join(''));
                //console.log('#', parseInt(tmp[0] + '' + tmp[5], 2), parseInt(tmp.slice(1, 5).join(''), 2), constants.sBoxes[i][parseInt(tmp[0] + '' + tmp[5], 2)][parseInt(tmp.slice(1, 5).join(''), 2)]);
                block32Bits = [...block32Bits, ...expandBits(
                    (() => {
                        const _ = constants.sBoxes[i][parseInt(tmp[0] + '' + tmp[5], 2)][parseInt(tmp.slice(1, 5).join(''), 2)].toString(2).split('');
                        for (let __ = 0; __ < _.length; __++)
                            _[__] *= 1;
                        return _;
                    })(),
                    4, 4, true
                )]
            }
            return block32Bits;
        }

        const xor = (block1, block2) => {
            const result = [], loopLength = block2.length;

            for (let i = 0; i < loopLength; i++)
                result.push(block1[i] ^ block2[i]);

            return result;
        }

        const leftCircularShift = (bits, count) => {
            let newBits = bits.slice(), first;
            let loopLen = bits.length - 1;
            for (let j = 0; j < count; j++) {
                first = newBits[0];
                for (let i = 0; i < loopLen; i++)
                    newBits[i] = newBits[i + 1];
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

        const expandBits = (bits, dividalbeBy, maxLen = undefined, before = false) => {
            const reminder = bits.length % dividalbeBy;
            let newBits = bits.slice();

            if (reminder) {
                const extension = dividalbeBy - reminder;
                const tmpArr = [];
                for (let i = 0; i < extension; i++)
                    tmpArr.push(0);
                if (before)
                    newBits = [...tmpArr, ...newBits];
                else
                    newBits = [...newBits, ...tmpArr];
            }

            return (newBits.length > maxLen) ? newBits.slice(0, maxLen) : newBits;

        }

        const generateKeys = (key) => {
            const keys = [];
            const permuted = permFunction(key, constants.parityBitDrop);

            let left = permuted.slice(0, 28);
            let right = permuted.slice(28, 56);

            for (let i = 0; i < 16; i++) {
                left = leftCircularShift(left, (constants.oneBitShiftOfKey.includes(i) ? 1 : 2));
                right = leftCircularShift(right, (constants.oneBitShiftOfKey.includes(i) ? 1 : 2));
                keys.push(permFunction([...left, ...right], constants.keyCompression));
            }

            return keys;
        }

        const byteToBits = (byte) => {
            const bits = [];

            for (var i = 128; i >= 1; i /= 2)
                bits.push(byte & i ? 1 : 0)

            return bits.reverse();
        }

        const strToBits = (data) => {
            let length = data.length, bits = [], bin, j;
            for (let i = 0; i < length; i++) {
                bin = data[i].charCodeAt(0).toString(2);
                if (bin.length < 8)
                    for (j = bin.length; j < 8; j++)
                        bin = '0' + bin;

                for (j = 0; j < bin.length; j++)
                    bits.push(1 * bin[j]);
            }
            return expandBits(bits, 8);
        }

        const binaryStringToBits = (bin) => {
            const bins = bin.split(' ');
            const bits = [];
            let i, j;
            for (i = 0; i < bins.length; i++)
                for (j = 0; j < 8; j++)
                    bits.push(1 * bins[i][j]);
            return bits;
        }

        const setBitsBlock = (bits, block, index, len = 64) => {
            for (let i = 0; i < len; i++)
                bits[i + len * index] = block[i];
            return bits;
        }

        const getBitsBlock = (bits, index, len = 64) => {
            const block = [];
            for (let i = 0; i < len; i++)
                block.push(bits[i + len * index]);
            return block;
        }

        const blockToHalves = (block) => {
            return [
                block.slice(0, 32),
                block.slice(32, 64)
            ];
        }

        const halvesToBlock = (left, right) => {
            return [...left, ...right];
        }

        const bitsBlockLength = (bits) => {
            return bits.length / 64;
        }

        const bitsToBytes = (bits) => {
            const bytes = [], loopLength = bits.length / 8;
            for (let i = 0; i < loopLength; i++) +
                bytes.push(parseInt(bits.substr(i * 8, 8), 2));
            return bytes;
        }

        const encrypt = (data, key, keyType = 'binary', dataType = 'binary', outputType = 'binary') => {
            const bitsOfKey = expandBits(keyType === 'binary' ? binaryStringToBits(key) : strToBits(key), 64, 64);

            const keys = generateKeys(bitsOfKey);

            let dataBits = expandBits(dataType === 'binary' ? binaryStringToBits(data) : strToBits(data), 64);

            const blocksLength = bitsBlockLength(dataBits);

            let left, right;

            for (let i = 0; i < blocksLength; i++)
                setBitsBlock(dataBits, permFunction(getBitsBlock(dataBits, i), constants.ip), i);

            for (let j = 0; j < 16; j++) {
                for (let i = 0; i < blocksLength; i++) {
                    [left, right] = blockToHalves(getBitsBlock(dataBits, i));
                    [left, right] = [right, xor(left, permFunction(
                        sBoxes(
                            xor(
                                permFunction(right, constants.eBit)
                                , keys[j])
                        )
                        , constants.p
                    ))]

                    if (j !== 15)
                        setBitsBlock(dataBits, [...left, ...right], i);
                    else
                        setBitsBlock(dataBits, [...right, ...left], i);

                }
            }

            for (let i = 0; i < blocksLength; i++)
                setBitsBlock(dataBits, permFunction(getBitsBlock(dataBits, i), constants.fp), i);

            switch (outputType.toLowerCase()) {
                case 'base64':
                    return Buffer.from(bitsToBytes(dataBits.join(''))).toString('base64');
                case 'byte':
                case 'bytes':
                    return bitsToBytes(dataBits.join(''));
                default:
                    return dataBits.join('');
            }
        }

        const generateCombinations = (list, len, callback) => {
            const f = (str = '') => {
                if (str.length && callback(str) === true)
                    return;
                if (str.length === len)
                    return;
                for (const c of list)
                    f(str + c);
            }
            f();
        }

        return encrypt('981531027', '12062440', 'string', 'string', 'base64');
    })
}

