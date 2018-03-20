require('isomorphic-fetch');
const filter = require('lodash/filter');
const find = require('lodash/find');
const idx = require('idx');

const { API_ROOT } = require('./constats');

const pather = (user, section, query = '') => `${API_ROOT}/users/${user}${section ? `/${section}` : ''}${query}`;

const formatGame = (game) => ({
  raw: game,
  image: game.background_image,
  name: game.name,
  color: game.dominant_color,
  released: game.released,
  platforms: game.platforms.map(p => p.platform.name)
});

const games = (user) => async (statuses) => {
  const filteredStatuses = typeof statuses === 'string' ? statuses : statuses.join(',');
  const path = pather(user, 'games', `?page=1&statuses=${filteredStatuses}`);
  const resp = await fetch(path);
  const json = await resp.json();

  const formatted = json.results.map(formatGame);
  return collection(json, formatted);
}

const profile = (user) => async () => {
  const path = pather(user);
  const resp = await fetch(path);
  const json = await resp.json();

  const formatted = {
    username: json.username,
    slug: json.slug,
    full_name: json.full_name,
    bio: json.bio,
    avatar: json.avatar,
    background: idx(json, _ => _.game_background.url),
    color: idx(json, _ => _.game_background.dominant_color),
    counters: {
      games: json.games_count,
      collections: json.collections_count,
      reviews: json.reviews_count,
      comments: json.comments_count,
      followers: json.followers_count,
      following: json.following_count
    },
    share: json.share_image
  }

  return single(json, formatted);
}

const favorite = (user) => async () => {
  const path = pather(user, 'favorites');
  const resp = await fetch(path);
  const json = await resp.json();
  
  const formatted = json.results.map(formatGame);
  return collection(json, formatted);
}

const single = (json, formatted) => ({
  raw: () => json,
  get: key => key ? formatted[key] : formatted
})

const collection = (json, formatted) => ({
  raw: () => json.results,
  get: () => formatted,
  count: () => json.count,
  filter: predicate => filter(formatted, predicate),
  find: predicate => filter(formatted, predicate),
  findOne: predicate => find(formatted, predicate)
})

const users = (user) => ({
  profile: profile(user),
  favorite: favorite(user),
  games: games(user)
})

module.exports = users;
