const express = require('express');
const status = require('http-status');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    console.log(`Received event ${res.locals.payload.type}`);

    res.sendStatus(status.ACCEPTED);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
