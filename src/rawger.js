const Fetcher = require('./fetcher');
const users = require('./users');

module.exports = (timeout = 60) => {
  let cache = {};

  const fetcher = Fetcher(cache, timeout * 1000);

  const purgeCache = cache => () => {
    Object.entries(cache).forEach(i => clearTimeout(i[1].timeout));
    Object.keys(cache).forEach(k => delete cache[k]);
  }
  return ({
    fetcher,
    users: users(fetcher),
    purgeCache: purgeCache(cache)
  });
};
