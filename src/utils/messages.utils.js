const initVault = () => { global.vault = [] };

const writeMessage = (from, to, encryptedMessage, signature) => global.vault.push({
    from, to, encryptedMessage, signature
})

module.exports = {
    initVault,
    writeMessage
}