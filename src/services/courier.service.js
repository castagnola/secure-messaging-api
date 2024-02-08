"use strict";

const { encryptMessage, decryptMessage } = require("../utils/crypto.utils");
const { login } = require("../utils/user.utils");

// Paso 7 Ruta para enviar mensajes
exports.sendMessage = (body, res) => {
    const { from, to, message } = body;
    try {
        // Obtener claves de los usuarios
        const sender = login(from);
        const receiver = login(to);
        const encryptedMessage = encryptMessage(message, receiver.publicKey);
        const decryptedMessage = decryptMessage(encryptedMessage, receiver.privateKey);

        res.json({ encryptedMessage, decryptedMessage });
    } catch (error) {
        console.error(error)

    }

};
