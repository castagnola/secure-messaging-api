"use strict";
const express = require("express");
const { sendMessage } = require("../controllers/courier.controller");

const router = express.Router();

router.post('/send-message', sendMessage);

module.exports = router;