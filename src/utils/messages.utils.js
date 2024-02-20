const initVault = () => { global.vault = [] };
const fs = require('fs').promises;

const writeMessage = (from, to, encryptedMessage, signature) => global.vault.push({
    from,
    to,
    encryptedMessage,
    signature
});

const writeChunks = (from, to, encryptedMessage) => {
    return fs.writeFile(`from_${from}_to_${to}`, JSON.stringify(encryptedMessage));
};

const readMessage = (from, to) => {
    const message = global.vault.filter((item) => (item.from === from && item.to === to));
    global.vault = global.vault.filter((item) => !(item.from === from && item.to === to));
    return message.length ? message[0] : null;
}
module.exports = {
    writeMessage,
    readMessage,
    writeChunks,
    initVault
}