'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async (request, reply) => {
        return reply.view('/view/pages/simpleXor/index.ejs');
    })
    fastify.post('/encrypt', async (request, reply) =>  {
        let xor = request.body.xor;
        const data = fastify.stringToHexString(fastify.simpleXorEncryption(request.body.data,xor));
        return reply.view('/view/pages/simpleXor/encrypted.ejs',{data,xor});
    })
    fastify.post('/decrypt', async (request, reply) =>  {
        const decrypted = fastify.simpleXorDecryption(fastify.hexStringToString(request.body.data));
        return reply.view('/view/pages/simpleXor/decrypted.ejs',{decrypted});
    })
}
