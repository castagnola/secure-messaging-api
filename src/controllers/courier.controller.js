"use strict"
const currierService = require('../services/courier.service')
// Paso 5 crear el controller
exports.sendMessage = (_req = request, _res = response) => {
    return currierService.sendMessage(_req.body, _res);
};