"use strict";

const { encryptMessage, decryptMessage, signMessage, verifySign } = require("../utils/crypto.utils");
const { writeMessage, readMessage, readChunks, writeChunks } = require("../utils/messages.utils");
const { streamToBuffer } = require("../utils/stream.utils");
const { login } = require("../utils/user.utils");
// Paso 7 Ruta para enviar mensajes
const postMessage = (body, res) => {
    const { from, to, message } = body;
    try {
        // Obtener claves de los usuarios
        const sender = login(from);
        const receiver = login(to);
        const signature = signMessage(message, sender.privateKey).toString('base64');
        const encryptedMessage = encryptMessage(message, receiver.publicKey).toString('base64');
        writeMessage(from, to, encryptedMessage, signature);
        res.json({ encryptedMessage, signature });
    } catch (error) {
        console.error(error)

    }
};

const postFile = async (body, res) => {
    const { from, to, file: { filename } } = body;
    try {
        // Obtener claves de los usuarios
        const sender = login(from);
        const receiver = login(to);
        const chunks = await streamToBuffer(filename);
        const encryptedChunks = [];
        for (let chunk of chunks) {
            chunk = chunk.toString();
            encryptedChunks.push({
                signature: signMessage(chunk, sender.privateKey).toString('base64'),
                encryptedMessage: encryptMessage(chunk, receiver.publicKey).toString('base64')
            });
        };
        //writeMessage(from, to, encryptedMessage, signature);
        await writeChunks(from, to, encryptedChunks);
        res.json({ message: 'The file has been uploaded and encrypted' });
    } catch (error) {
        console.error(error)
    }
};

const getMessage = (query, res) => {
    const { from, to } = query;
    try {
        const sender = login(from);
        const receiver = login(to);

        let { encryptedMessage, signature } = readMessage(from, to);
        const decryptedMessage = decryptMessage(encryptedMessage, receiver.privateKey);
        const verified = verifySign(decryptedMessage, sender.publicKey, signature);
        if (verified) {
            res.json({ message: decryptedMessage });
        } else {
            throw 'Signature validation error';
        }
    } catch (error) {
        console.error(error);
        res.status(401).end();
    }
};

const getFile = async (query, res) => {
    const { from, to } = query;
    try {
        const sender = login(from);
        const receiver = login(to);
        const chunks = JSON.parse(await readChunks(from, to));

        const decryptedChunks = [];
        for (let chunk of chunks) {
            const { encryptedMessage, signature } = chunk;
            const decryptedChunk = decryptMessage(encryptedMessage, receiver.privateKey);
            const verified = verifySign(decryptedChunk, sender.publicKey, signature);
            if (verified) {
                decryptedChunks.push(decryptedChunk);
            } else {
                throw 'Signature validation error';
            }
        };
        const decryptedFile = decryptedChunks.join('');
        res.attachment('sample.txt').send(decryptedFile);
    } catch (error) {
        console.error(error);
        res.status(401).end();
    }
};

module.exports = {
    postMessage,
    getMessage,
    postFile,
    getFile,
};
