const initVault = () => { global.vault = [] };

const writeMessage = (from, to, encryptedMessage, signature) => global.vault.push({
    from, to, encryptedMessage, signature
});

//extraer mensaje del vault

const readMessage = (from, to) => {

    const message = global.vault.filter((item) => (item.from === from && item.to === to));
    return message.length ? message[0] : null;
}
module.exports = {
    initVault,
    writeMessage,
    readMessage
}