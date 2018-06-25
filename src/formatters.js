const find = require('lodash/find');
const idx = require('idx');

const formatGame = game => ({
  raw: game,
  image: game.background_image,
  name: game.name,
  color: game.dominant_color,
  released: game.released,
  platforms: game.platforms.map(p => p.platform.name)
});

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
});

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

const formatProfile = profile => ({
  raw: profile,
  username: profile.username,
  slug: profile.slug,
  full_name: profile.full_name,
  bio: profile.bio,
  avatar: profile.avatar,
  background: idx(profile, _ => _.game_background.url),
  color: idx(profile, _ => _.game_background.dominant_color),
  counters: {
    games: profile.games_count,
    collections: profile.collections_count,
    reviews: profile.reviews_count,
    comments: profile.comments_count,
    followers: profile.followers_count,
    following: profile.following_count
  },
  share: profile.share_image
});


module.exports = {
  formatGame,
  formatCollection,
  formatReviews,
  formatProfile
}