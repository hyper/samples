// Set up ENV variables
require('dotenv').config();

// Require necessary packages
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const { Webhook } = require('diahook');
const { handle } = require('./services/webhook');

// Get ENV variables
const { TOKEN, HOOK } = process.env;
const PORT = process.env.PORT || 5000;
const IS_DEV = process.env.IS_DEV === 'true';

// Set up server and webhook
// Optional diahook webhook object to validate request bodies
// const wh = new Webhook(TOKEN);
const app = express();

// Set up middleware
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());

// POST /
app.post('/', async (req, res) => {
  try {
    // Optional payload validation
    // const payload = wh.verify(req.body, req.headers);
    await handle(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  if (TOKEN === '' || HOOK === '') {
    console.log('Please ensure you have set valid ENV variables!');
    process.exit(0);
  }

  console.log(`Server Listening at port ${PORT}`);
});
