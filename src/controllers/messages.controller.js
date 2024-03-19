const { request, response } = require("express")
const messageService = require("../services/messages.service")

const postMessage = (_req = request, _res = response) => {
    return messageService.postMessage(_req.body, _res);
}

module.exports = {
    postMessage
}