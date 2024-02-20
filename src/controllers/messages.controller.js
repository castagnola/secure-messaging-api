"use strict"
const messagesService = require('../services/messages.service')
// Paso 5 crear el controller

const postMessage = (_req = request, _res = response) => {
    return messagesService.postMessage(_req.body, _res);
};

const postFile = (_req = request, _res = response) => {
    return messagesService.postFile({ file: _req.file, ..._req.body }, _res);
};

const getMessage = (_req = request, _res = response) => {
    return messagesService.getMessage(_req.query, _res);
};

module.exports = {
    postMessage,
    getMessage,
    postFile,
}