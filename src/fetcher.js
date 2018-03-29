require('isomorphic-fetch');

const get = (cache, timeout) => async (path, options = {}) => {
  if (typeof cache[path] !== 'undefined') return cache[path].data;
  
  const resp = await fetch(path, options);
  const json = await resp.json();

  // saves timeoutID for purging timers
  const timeoutID = setTimeout(() => { delete cache[path]; }, timeout);

  cache[path] = {
    timeout: timeoutID,
    data: json
  };
  return json;
}

module.exports = (cache, timeout) => ({
  get: get(cache, timeout)
});
