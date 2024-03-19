const { request, response } = require("express");
const userService = require('../services/user.service');

const login = (_req = request, _res = response) => {
    return userService.login(_req.body, _res)
};

module.exports = {
    login
}