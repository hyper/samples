const status = require('http-status');
const { Webhook } = require('svix');

const webhook = new Webhook(process.env.SVIX_SECRET);

module.exports = function svixMiddleware() {
  return function (req, res, next) {
    try {
      res.locals.payload = webhook.verify(req.rawBody, req.headers);
      next();
    } catch (err) {
      return res.status(status.UNAUTHORIZED);
    }
  };
};
