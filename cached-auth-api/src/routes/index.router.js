const express = require('express');

const router = express.Router();

router.use('/', require('./auth.router'));

module.exports = router;
