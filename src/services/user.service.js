"use strict";

const { storeUsersKeys, login } = require("../utils/user.utils");

// Paso 6 crear servicio Login
exports.login = (body, res) => {
    console.log(body)
    const { username } = body;
    const { publicKey, privateKey } = login(username)
    storeUsersKeys(username, { publicKey, privateKey });

    res.json(
        {
            msg: 'Login successful',
            publicKey
        });
};


