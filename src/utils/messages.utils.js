const initVault = () => { global.vault = [] };
const fs = require('fs').promises;
const path = require('path');

const writeMessage = (from, to, encryptedMessage, signature) => global.vault.push({
    from,
    to,
    encryptedMessage,
    signature
});

const writeChunks = (from, to, encryptedMessage) => {
    const filePath = path.resolve(__dirname, '../../confidential', `from_${from}_to_${to}.json`);
    return fs.writeFile(filePath, JSON.stringify(encryptedMessage));
};

const readMessage = (from, to) => {
    const message = global.vault.filter((item) => (item.from === from && item.to === to));
    global.vault = global.vault.filter((item) => !(item.from === from && item.to === to));
    return message.length ? message[0] : null;
}

const readChunks = (from, to) => {
    const filePath = path.resolve(__dirname, '../../confidential', `from_${from}_to_${to}.json`);
    return fs.readFile(filePath);
};



module.exports = {
    writeMessage,
    readMessage,
    writeChunks,
    readChunks,
    initVault
}