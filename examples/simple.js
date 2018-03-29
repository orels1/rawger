const Rawger = require('../src');

(async () => {
  // initialize rawger with 10s cache timeout
  // default is 60s (if no value is passed
  const rawger = await Rawger({ timeout: 10 });
  const { users } = rawger;

  const profile = (await users('orels1').profile()).get();
  console.log(profile);

  // request same data after a second
  // will get data from cache
  setTimeout(async () => console.log((await users('orels1').profile()).get()), 1000);

  // request same data after 15 seconds
  // will get fresh data
  setTimeout(async () => console.log((await users('orels1').profile()).get()), 15000);

  // purges cache before the new request
  setTimeout(async () => {
    console.log('purging cache');
    rawger.purgeCache();
    console.log((await users('orels1').profile()).get());
  }, 18000)
})();