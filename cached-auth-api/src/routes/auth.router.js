const express = require('express');
const cache = require('../middlewares/cache');

const router = express.Router();

router.get('/auth/:license', cache(), async (req, res) => {
  res.json(res.locals.license);
});

module.exports = router;
