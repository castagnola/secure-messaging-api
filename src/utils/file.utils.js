const File = require("../models/file.model");

const saveChunks = async (from, to, encryptedMessage) => {
    try {
        await File.create({ from, to, data: encryptedMessage });

    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    saveChunks,
}