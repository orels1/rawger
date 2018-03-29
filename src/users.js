const filter = require('lodash/filter');
const find = require('lodash/find');
const idx = require('idx');
const { pather } = require('./utils');

const usersPather = pather('users');

const fetchPage = fetcher => (url, formatter) => async () => {
  const json = await fetcher.get(url);

  const formatted = json.results.map(formatter);
  return collection(fetcher)(json, formatted, formatter);
}

const formatGame = game => ({
  raw: game,
  image: game.background_image,
  name: game.name,
  color: game.dominant_color,
  released: game.released,
  platforms: game.platforms.map(p => p.platform.name)
});

const games = fetcher => user => async (statuses) => {
  const filteredStatuses = typeof statuses === 'string' ? statuses : statuses.join(',');
  const path = usersPather(user, 'games', `?page=1&statuses=${filteredStatuses}`);
  const json = await fetcher.get(path);

  const formatted = json.results.map(formatGame);
  return collection(fetcher)(json, formatted, formatGame);
}

const profile = fetcher => user => async () => {
  const path = usersPather(user);
  const json = await fetcher.get(path);

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

  return single(fetcher)(json, formatted);
}

const favorite = fetcher => user => async () => {
  const path = usersPather(user, 'favorites');
  const json = await fetcher.get(path);
  
  const formatted = json.results.map(formatGame);
  return collection(fetcher)(json, formatted, formatGame);
}

const formatCollection = collection => ({
  raw: collection,
  name: collection.name,
  description: collection.description,
  image: collection.game_background.url,
  color: collection.game_background.dominant_color,
  created: collection.created,
  updated: collection.updated,
  games: collection.games_count,
  ratings: collection.likes_rating,
  share: collection.share_image,
  creator: collection.creator
})

const collections = fetcher => user => async () => {
  const path = usersPather(user, 'collections');
  const json = await fetcher.get(path);

  const formatted = json.results.map(formatCollection);
  return collection(fetcher)(json, formatted, formatCollection);
}

const formatReviews = review => ({
  raw: review,
  game: review.game.name,
  text: review.text,
  rating: find(review.game.ratings, { id: review.rating }).title,
  created: review.created,
  likes: review.likes_rating,
  comments: review.comments,
  share: review.share_image
});

const reviews = fetcher => user => async () => {
  const path = usersPather(user, 'reviews');
  const json = await fetcher.get(path);

  const formatted = json.results.map(formatReviews);
  return collection(fetcher)(json, formatted, formatReviews);
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
