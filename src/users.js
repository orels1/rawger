require('isomorphic-fetch');
const filter = require('lodash/filter');
const find = require('lodash/find');
const idx = require('idx');

const { API_ROOT } = require('./constats');

const pather = (user, section, query = '') => `${API_ROOT}/users/${user}/${section}${query}`;

const games = (user) => async (statuses) => {
  const filteredStatuses = typeof statuses === 'string' ? statuses : statuses.join(',');
  const path = pather(user, 'games', `?page=1&statuses=${filteredStatuses}`);
  const resp = await fetch(path);
  const json = await resp.json();

  const results = json.results.map(game => ({
    raw: game,
    image: game.background_image,
    name: game.name,
    color: game.dominant_color,
    released: game.released,
    platforms: game.platforms.map(p => p.platform.name)
  }));

  return ({
    raw: () => json.results,
    get: () => results,
    count: () => results.length,
    filter: predicate => filter(results, predicate),
    find: predicate => filter(results, predicate),
    findOne: predicate => find(results, predicate)
  });
}

const users = (user) => ({
  games: games(user)
})

module.exports = users;
