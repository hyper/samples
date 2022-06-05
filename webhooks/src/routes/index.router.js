const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const svix = require('../middleware/svix');

const router = express.Router();

router.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  },
}));
router.use(express.urlencoded({ extended: false }));
router.use(helmet());
router.use(cors());
router.use('/webhook', svix(), require('./webhook.router'));

module.exports = router;
