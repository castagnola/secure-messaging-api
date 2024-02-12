"use strict";

const { encryptMessage, decryptMessage, signMessage, verifySign } = require("../utils/crypto.utils");
const { writeMessage, readMessage } = require("../utils/messages.utils");
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


module.exports = {
    postMessage,
    getMessage,
};
