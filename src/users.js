const filter = require('lodash/filter');
const find = require('lodash/find');
const { pather } = require('./utils');
const formatters = require('./formatters');

const usersPather = pather('users');

// Fetches pages for paginated enpoints
const fetchPage = fetcher => (url, formatter) => async () => {
  const json = await fetcher.get(url);

  const formatted = json.results.map(formatter);
  return collection(fetcher)(json, formatted, formatter);
}

// 
const games = fetcher => user => async (statuses) => {
  const filteredStatuses = typeof statuses === 'string' ? statuses : statuses.join(',');
  const path = usersPather(user, 'games', `?page=1&statuses=${filteredStatuses}`);
  const json = await fetcher.get(path);

  const formatted = json.results.map(formatters.formatGame);
  return collection(fetcher)(json, formatted, formatters.formatGame);
}

const profile = fetcher => user => async () => {
  const path = usersPather(user);
  const json = await fetcher.get(path);

  const formatted = formatters.formatProfile(json)
  return single(fetcher)(json, formatted);
}

const favorite = fetcher => user => async () => {
  const path = usersPather(user, 'favorites');
  const json = await fetcher.get(path);
  
  const formatted = json.results.map(formatters.formatGame);
  return collection(fetcher)(json, formatted, formatters.formatGame);
}

const collections = fetcher => user => async () => {
  const path = usersPather(user, 'collections');
  const json = await fetcher.get(path);

  const formatted = json.results.map(formatters.formatCollection);
  return collection(fetcher)(json, formatted, formatters.formatCollection);
}

const reviews = fetcher => user => async () => {
  const path = usersPather(user, 'reviews');
  const json = await fetcher.get(path);

  const formatted = json.results.map(formatters.formatReviews);
  return collection(fetcher)(json, formatted, formatters.formatReviews);
}

const update = fetcher => user => () => ({
  game: updateGame(fetcher)(user)
});

const updateGame = fetcher => user => async (id, data) => {
  const path = usersPather('current', `games/${id}`);
  const json = await fetcher.patch(path, data);

  return single(fetcher)(json, { ...json, user });
}

const single = fetcher => (json, formatted) => ({
  raw: () => json,
  get: key => key ? formatted[key] : formatted
})

const collection = fetcher => (json, formatted, formatter) => ({
  raw: () => json.results,
  get: () => formatted,
  count: () => json.count,
  filter: predicate => filter(formatted, predicate),
  find: predicate => filter(formatted, predicate),
  findOne: predicate => find(formatted, predicate),
  next: json.next ? fetchPage(fetcher)(json.next, formatter) : () => {},
  previous: json.previous ? fetchPage(fetcher)(json.next, formatter) : () => {}
})

const users = fetcher => user => ({
  profile: profile(fetcher)(user),
  favorite: favorite(fetcher)(user),
  games: games(fetcher)(user),
  collections: collections(fetcher)(user),
  reviews: reviews(fetcher)(user),
  update: update(fetcher)(user)
})

module.exports = fetcher => users(fetcher);
