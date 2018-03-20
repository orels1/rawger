require('isomorphic-fetch');
const { users } = require('./src');

(async () => {
  // Get currently playing games for user
  const gamesPlaying = (await users('orels1').games('playing')).get();
  console.log(gamesPlaying);

  // Get user's favorite games
  const favorite = (await users('orels1').favorite()).get();
  console.log(favorite);

  // Get user profile
  const profile = (await users('orels1').profile()).get();
  console.log(profile);
})();
