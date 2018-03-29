require('isomorphic-fetch');
const merge = require('lodash/merge');

const defaultHeaders = {
  headers: {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
};

const get = (cache, timeout, token) => async (path, options = {}) => {
  if (typeof cache[path] !== 'undefined') return cache[path].data;
  
  const resp = await fetch(path, merge(options, { headers: { token } }, defaultHeaders));
  const json = await resp.json();

  // saves timeoutID for purging timers
  const timeoutID = setTimeout(() => { delete cache[path]; }, timeout);

  cache[path] = {
    timeout: timeoutID,
    data: json
  };
  return json;
}

const post = token => async (path, data, options = {}) => {
  const resp = await fetch(path, merge(options, {
    method: 'POST',
    headers: { token: `Token ${token}` },
    body: JSON.stringify(data)
  }, defaultHeaders));
  const json = await resp.json();
  return json;
}

const patch = token => async (path, data, options = {}) => {
  const resp = await fetch(path, merge(options, {
    method: 'PATCH',
    headers: {
      token: `Token ${token}`
    },
    body: JSON.stringify(data)
  }, defaultHeaders));
  const json = await resp.json();
  return json;
}

module.exports = (cache, timeout, token) => ({
  get: get(cache, timeout, token),
  post: post(token),
  patch: patch(token)
});
