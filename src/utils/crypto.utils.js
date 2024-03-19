const crypto = require("crypto");


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

const signMessage = (message, privateKey) => {
    try {
        const sign = crypto.sign("SHA256", Buffer.from(message), privateKey);
        return sign;

    } catch (error) {

        console.error(`Error during signMessage`, error.message);
        throw error
    }
}

const verifySign = (message, publicKey, signature) => {
    try {
        const verify = crypto.verify("SHA256", Buffer.from(message), publicKey);
        return verify;

    } catch (error) {
        console.error(`Error during verifySign`, error.message);
        throw error
    }

}

module.exports = {
    generateKeyPair,
    encryptMessage,
    signMessage,
    verifySign

}