const crypto = require("crypto");

/**
 * generacion de claves
 * @returns 
 */
const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });
    return { publicKey, privateKey }
}

/**
 * Cifrar 
 * @param {*} message 
 * @param {*} publicKey 
 * @returns 
 */
const encryptMessage = (message, publicKey) => {
    try {

        const encryptedData = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
            Buffer.from(message)
        );
        return encryptedData
    } catch (error) {

        console.error(`Error during encryptMessage`, error.message);
        throw error
    }
}

const decryptMessage = (encryptedMessage, privateKey) => {
    try {
        const decryptedData = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_PADDING
            },
            Buffer.from(encryptedMessage, 'base64')
        );

        return decryptedData.toString();

    } catch (error) {

        console.error(`Error during decryptMessage`, error.message);
        throw error
    }
}

/**
 * generar firma al mensaje
 * @param {*} message 
 * @param {*} privateKey 
 * @returns 
 */
const signMessage = (message, privateKey) => {
    try {
        const sign = crypto.sign("SHA256", Buffer.from(message), privateKey);
        return sign;

    } catch (error) {

        console.error(`Error during signMessage`, error.message);
        throw error
    }
}

/**
 * Generar verificacion de la firma
 * @param {*} message 
 * @param {*} publicKey 
 * @param {*} signature 
 * @returns 
 */
const verifySign = (message, publicKey, signature) => {
    try {
        const verify = crypto.verify("SHA256", Buffer.from(message), publicKey, Buffer.from(signature, 'base64'));
        return verify;

    } catch (error) {
        console.error(`Error during verifySign`, error.message);
        throw error
    }

}

module.exports = {
    generateKeyPair,
    encryptMessage,
    decryptMessage,
    signMessage,
    verifySign

}