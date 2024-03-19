"use strict";
const express = require("express");
const { postMessage } = require("../controllers/messages.controller");

const router = express.Router();

router.post('/', postMessage);
router.get('/');

module.exports = router;