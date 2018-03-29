const Rawger = require('../src');

(async () => {
  // init rawger with default cache timeout and authenticated form
  // all fetcher requests are now authenticated
  // so you can use it to perform custom requests as well
  const rawger = await Rawger({
    email: process.env.RAWG_USER,
    password: process.env.RAWG_PASS
  });
  
  const { users } = rawger;

  // update a game state
  const result = await users('orels1').update().game('23585', {
    status: 'toplay'
  });
  console.log(result.get('status')); // will return 'toplay' if succeeded
})();