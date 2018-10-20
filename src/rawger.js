require('./fetchLoader');
const Fetcher = require('./fetcher');
const users = require('./users');
const games = require('./games');
const { pather } = require('./utils');

module.exports = async ({ timeout = 60, email, password } = {}) => {
  let cache = {};
  let token = '';

  // log in if creds were provided
  if (email && password) {
    const resp = await fetch(pather('auth')('login'), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    });

    const json = await resp.json();
    token = json.key;
  }

  // init fetcher
  const fetcher = Fetcher(cache, timeout * 1000, token);

  // init cache purger
  const purgeCache = cache => () => {
    Object.entries(cache).forEach(i => clearTimeout(i[1].timeout));
    Object.keys(cache).forEach(k => delete cache[k]);
  };

  // init lib
  return {
    fetcher,
    users: users(fetcher),
    games: games(fetcher),
    purgeCache: purgeCache(cache)
  };
};
