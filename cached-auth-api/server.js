require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const throng = require('throng');

const port = parseInt(process.env.PORT, 10) || 7000;
const dev = process.env.NODE_ENV !== 'production';

async function start() {
  const app = express();

  if (dev) app.use(morgan('dev'));

  app.set('trust proxy', !dev);
  app.disable('x-powered-by');

  app.use('/', require('./src/routes/index.router'));

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on ${port}`);
  });
}

throng({
  worker: start,
  count: process.env.WEB_CONCURRENCY || 1,
  lifetime: Infinity,
});
