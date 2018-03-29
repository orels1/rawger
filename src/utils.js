const { API_ROOT } = require('./constats');

const pather = endpoint => (item, section, query = '') => `${API_ROOT}/${endpoint}/${item}${section ? `/${section}` : ''}${query}`;

exports.pather = pather;
