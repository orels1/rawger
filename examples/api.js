const Rawger = require('../src');

(async () => {
  const rawger = await Rawger({ timeout: 10 });

  const { users, games } = rawger;
  // Get currently playing games for user
  const gamesPlaying = (await users('orels1').games('playing')).get();
  console.log(gamesPlaying);

  // Get user's favorite games
  const favorite = (await users('orels1').favorite()).get();
  console.log(favorite);

  // Get user profile
  const profile = (await users('orels1').profile()).get();
  console.log(profile);

  // Get next page for the paginated endpoints
  const games = await (await users('orels1').games('owned')).next();
  const nextGames = games.get();
  console.log(nextGames);

  // Get user's collections
  const collections = (await users('orels1').collections()).get();
  console.log(collections);

  // Get user's reviews
  const reviews = (await users('orels1').reviews()).get();
  console.log(reviews);

  // Get games matching 'witcher'
  const searchResults = (await games.search('witcher')).get();
  console.log(searchResults);

  // Get single game by slug
  const searchResults = (await games.get('the-witcher-3-wild-hunt')).get();
  console.log(searchResults);
})();
