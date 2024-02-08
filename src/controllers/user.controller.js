"use strict";

const { response, request } = require("express");
const userService = require('../services/user.service')

// Paso 5 crear el controller
exports.login = (_req = request, _res = response) => {
    return userService.login(_req.body, _res);
};