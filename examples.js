require('isomorphic-fetch');
const { users } = require('./src');

(async () => {
  // Get currently playing games for user
  const gamesPlaying = (await users('orels1').games('playing')).get();
  console.log(gamesPlaying)
})();
