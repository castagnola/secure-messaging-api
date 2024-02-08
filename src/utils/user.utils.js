"use strict"
const fs = require("fs");
const { generateKeyPair } = require("./crypto.utils");

//Paso dos saveUserKeys y login funciones
const users = {};

exports.storeUsersKeys = (username, { publicKey, privateKey }) => {
    fs.writeFileSync(`secrets/${username}_public.pem`, publicKey);
    fs.writeFileSync(`secrets/${username}_private.pem`, privateKey);
}

exports.login = (username) => {
    if (!users[username]) {
        users[username] = generateKeyPair();
        //storeUsersKeys(username, users[username])
    }
    return users[username];

}
