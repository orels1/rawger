const { pather, fetchPage, single, collection } = require('./utils');
const formatters = require('./formatters');

const gamesPather = pather('games');

const search = fetcher => async game => {
  const path = gamesPather('', null, `?page_size=20&page=1&search=${game}`);
  const json = await fetcher.get(path);

  const formatted = json.results.map(formatters.formatGame);
  console.log('json');
  return collection(fetcher)(json, formatted, formatters.formatGame);
};

const get = fetcher => async slug => {
  const path = gamesPather(slug);
  const json = await fetcher.get(path);

  const formatted = formatters.formatGame(json);
  return single(fetcher)(json, formatted);
};

const games = fetcher => ({
  search: search(fetcher),
  get: get(fetcher)
});

module.exports = fetcher => games(fetcher);
