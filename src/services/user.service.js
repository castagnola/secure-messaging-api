const { storeUsersKeys, login: loginUtils } = require("../utils/user.utils");


const login = (body, res) => {
    const { username } = body;
    const { publicKey, privateKey } = loginUtils(username);
    storeUsersKeys(username, { publicKey, privateKey });

    res.json({
        msg: 'Login',
        publicKey
    })
}

module.exports = {
    login
}