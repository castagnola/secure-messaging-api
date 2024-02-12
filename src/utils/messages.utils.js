const initVault = () => { global.vault = [] };

const writeMessage = (from, to, encryptedMessage, signature) => global.vault.push({
    from,
    to,
    encryptedMessage,
    signature
});

const readMessage = (from, to) => {
    const message = global.vault.filter((item) => (item.from === from && item.to === to));
    global.vault = global.vault.filter((item) => !(item.from === from && item.to === to));
    return message.length ? message[0] : null;
}
module.exports = {
    writeMessage,
    readMessage,
    initVault
}