'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async (request, reply) => {
        return reply.view('/view/pages/shiftCipher/index.ejs');
    })
    fastify.post('/encrypt', async (request, reply) =>  {
        let round = request.body.round;
        const data = fastify.utf8ToBase64(fastify.shiftCipherEncryption(request.body.data,round));
        return reply.view('/view/pages/shiftCipher/encrypted.ejs',{data,round});
    })
    fastify.post('/decrypt', async (request, reply) =>  {
        console.log('#########3',fastify.base64ToUtf8(request.body.data))
        const decrypted = fastify.shiftCipherDecryption(fastify.base64ToUtf8(request.body.data));
        return reply.view('/view/pages/shiftCipher/decrypted.ejs',{decrypted});
    })
}
