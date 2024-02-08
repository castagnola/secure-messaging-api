"use strict";
const crypto = require('crypto'); // Agrega esta línea al inicio del archivo si aún no está presente



// Paso 1: funcion generateKeyPair
exports.generateKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // Longitud de la clave
        publicKeyEncoding: {
            type: 'pkcs1', // Formato de la clave pública
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1', // Formato de la clave privada
            format: 'pem'
        }
    });

    return { publicKey, privateKey };
};

// Paso 3: función encryptMessage
exports.encryptMessage = (message, publicKey) => {
    try {
        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING // Relleno para RSA
            },
            Buffer.from(message)
        );

        return encryptedData;
    } catch (error) {
        console.error('Error during encryption:', error.message);
        throw error;
    }
};

// Paso 4: función decryptMessage
exports.decryptMessage = (encryptedMessage, privateKey) => {
    try {
        const decryptedData = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_PADDING
            },
            encryptedMessage
        );
        return decryptedData.toString();
    } catch (error) {
        console.error('Error during decryption:', error.message);
        throw error;
    }
};