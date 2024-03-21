"use strict";
const express = require("express");
const { postMessage, getMessage } = require("../controllers/messages.controller");

const router = express.Router();

router.post('/', postMessage);
router.get('/', getMessage);

module.exports = router;