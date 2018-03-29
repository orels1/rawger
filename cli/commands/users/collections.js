module.exports = (() => {

  'use strict';

  const Command = require('cmnd').Command;
  const { stripIndents } = require('common-tags');
  const Rawger = require('../../../src');

  const rawger = Rawger();
  const { users } = rawger;

  class Collection extends Command {

    constructor() {

      super('users', 'collections');

    }

    help() {

      return {
        description: 'Get user\'s collections games',
        args: ['username']
      };

    }

    formatter(user, collections) {
      return (stripIndents`
        👤  ${user}'s collections
        👾  ${collections.length} total

        ${collections.map(collection => ` - ${collection.name}`).join('\n')}
      `);
    }

    run({ args }, callback) {
      users(args[0]).collections()
        .then(collections => callback(null, this.formatter(args[0], collections.get())))
        .catch(e => callback(new Error(e.message)))
    }

  }

  return Collection;

})();