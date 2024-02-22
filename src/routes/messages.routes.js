"use strict";
const express = require("express");
const {
    postMessage,
    getMessage,
    postFile,
    getFile } = require("../controllers/messages.controller");
const multer = require('multer');

const router = express.Router();
const uploader = multer({ dest: 'uploads/' });

router.post('/file', uploader.single('message'), postFile);
router.get('/file', getFile);
router.post('/', postMessage);
router.get('/', getMessage);

module.exports = router;