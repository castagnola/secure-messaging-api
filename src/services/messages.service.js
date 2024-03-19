const { signMessage, encryptMessage } = require("../utils/crypto.utils");
const { writeMessage } = require("../utils/messages.utils");
const { login } = require("../utils/user.utils")


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
module.exports = {
    postMessage
}