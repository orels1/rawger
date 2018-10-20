const filter = require('lodash/filter');
const find = require('lodash/find');
const { API_ROOT } = require('./constats');

const pather = endpoint => (item, section, query = '') =>
  `${API_ROOT}/${endpoint}${item ? `/${item}` : ''}${
    section ? `/${section}` : ''
  }${query}`;

exports.pather = pather;

// Fetches pages for paginated enpoints
const fetchPage = fetcher => (url, formatter) => async () => {
  const json = await fetcher.get(url);

  const formatted = json.results.map(formatter);
  return collection(fetcher)(json, formatted, formatter);
};

exports.fetchPage = fetchPage;

const single = fetcher => (json, formatted) => ({
  raw: () => json,
  get: key => (key ? formatted[key] : formatted)
});

exports.single = single;

const collection = fetcher => (json, formatted, formatter) => ({
  raw: () => json.results,
  get: () => formatted,
  count: () => json.count,
  filter: predicate => filter(formatted, predicate),
  find: predicate => filter(formatted, predicate),
  findOne: predicate => find(formatted, predicate),
  next: json.next ? fetchPage(fetcher)(json.next, formatter) : () => {},
  previous: json.previous ? fetchPage(fetcher)(json.next, formatter) : () => {}
});

exports.collection = collection;
