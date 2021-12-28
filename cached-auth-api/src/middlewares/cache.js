const RedisCache = require('express-redis-cache');
const { retrieveLicense } = require('../services/hyper.service');

const cache = RedisCache({
  expire: 900,
  prefix: 'license',
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  auth_pass: process.env.REDIS_PASSWORD || null,
});

module.exports = function () {
  return async function (req, res, next) {
    try {
      const cachedLicense = await new Promise((resolve, reject) => {
        cache.get(req.params.license, async (err, response) => {
          if (err) reject(err);

          if (response.length) resolve(JSON.parse(response[0].body));

          resolve(null);
        });
      });

      if (cachedLicense) res.locals.license = cachedLicense;
      else {
        const license = await retrieveLicense(req.params.license);

        await new Promise((resolve, reject) => {
          cache.add(req.params.license, JSON.stringify(license), { type: 'json' }, (err) => {
            if (err) return reject(err);

            resolve();
          });
        });

        res.locals.license = license;
      }

      if (!res.locals.license) return res.sendStatus(404);

      next();
    } catch (err) {
      return res.sendStatus(500);
    }
  };
};
