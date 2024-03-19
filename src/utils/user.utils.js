const fs = require("fs");
const { generateKeyPair } = require("./crypto.utils");

const users = {};
const storeUsersKeys = (username, { publicKey, privateKey }) => {

    fs.writeFileSync(`secrets/${username}_public.pem`, publicKey);
    fs.writeFileSync(`secrets/${username}_private.pem`, privateKey);
}

const login = (username) => {
    if (!users[username]) {
        users[username] = generateKeyPair();
    }
    return users[username]
}

module.exports = {
    storeUsersKeys,
    login
}