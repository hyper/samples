module.exports = function errorHandler(err, req, res, next) {
  if (err instanceof SyntaxError) {
    res.status(400).send({
      error: {
        message: 'Invalid request',
        type: 'invalid_request_error',
      },
    });
  } else {
    res.status(500).send({
      error: {
        message: 'API error',
        type: 'api_error',
      },
    });
  }

  next();
};
