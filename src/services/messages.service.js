const { signMessage, encryptMessage, decryptMessage, verifySign } = require("../utils/crypto.utils");
const { writeMessage, readMessage } = require("../utils/messages.utils");
const { login } = require("../utils/user.utils")

/**
 * Enviar mensaje
 * @param {*} body 
 * @param {*} res 
 */
const postMessage = (body, res) => {
    const { from, to, message } = body;
    try {
        // Obtener claves users
        const sender = login(from);
        const receiver = login(to);
        //generar firma
        const signature = signMessage(message, sender.privateKey).toString("base64");
        //cifrar mensaje
        const encryptedMessage = encryptMessage(message, receiver.publicKey).toString("base64");
        writeMessage(from, to, encryptedMessage, signature);

        res.json({
            encryptedMessage,
            signature
        });

    } catch (error) {

        console.error(`Error from postMessage `, error)
    }
}

//get del mensaje
const getMessage = (query, res) => {
    const { from, to } = query;
    try {
        const sender = login(from);
        const receiver = login(to);
        let { encryptedMessage, signature } = readMessage(from, to);
        const fakeUser = login("Andres"); // Agregrar
        const decryptedMessage = decryptMessage(encryptedMessage, fakeUser.privateKey);// Agregar
        //const decryptedMessage = decryptMessage(encryptedMessage, receiver.privateKey); Comentariar y probar
        const verified = verifySign(decryptedMessage, sender.publicKey, signature);
        if (verified) {
            res.json({ message: decryptedMessage });
        } else {
            res.status(401).message('Signature validation error');
        }
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
};

module.exports = {
    postMessage,
    getMessage
}