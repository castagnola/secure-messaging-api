"use strict";
const express = require("express");
const {
    postMessage,
    getMessage,
    postFile } = require("../controllers/messages.controller");
const multer = require('multer');

const router = express.Router();
const uploader = multer({ dest: 'uploads/' });

router.post('/file', uploader.single('message'), postFile);
router.post('/', postMessage);
router.get('/', getMessage);

module.exports = router;