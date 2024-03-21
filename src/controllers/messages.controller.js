const { request, response } = require("express")
const messageService = require("../services/messages.service")

const postMessage = (_req = request, _res = response) => {
    return messageService.postMessage(_req.body, _res);
};

const getMessage = (_req = request, _res = response) => {
    return messageService.getMessage(_req.query, _res);
};

module.exports = {
    postMessage,
    getMessage
}