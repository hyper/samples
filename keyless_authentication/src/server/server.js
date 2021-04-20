const express = require('express');
const morgan = require('morgan');
const auth = require('./routes/login');

const server = express();

// Extend morgan for UI Logs
server.use(morgan((tokens, req, res) => {
  const message = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ');
  document.getElementById('log').append(`${message}\n`);
}));

// Mount Routes
server.use('/auth', auth);

server.listen(6789, () => {
  // eslint-disable-next-line no-console
  console.log('Local Server Live');
});
