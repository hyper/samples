const express = require('express');
const morgan = require('morgan');
const throng = require('throng');
const errorHandler = require('./src/middleware/errorHandler');

const port = parseInt(process.env.PORT, 10) || 7000;
const dev = process.env.NODE_ENV !== 'production';

async function start() {
  if(!process.env.SVIX_SECRET) throw new Error('SVIX_SECRET is not set');

  const app = express();

  if (dev) app.use(morgan('dev'));

  app.set('trust proxy', !dev);
  app.disable('x-powered-by');

  // Set up routers
  app.use('/', require('./src/routes/index.router'));
  app.use(errorHandler);

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
