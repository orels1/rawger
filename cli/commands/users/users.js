module.exports = (() => {

  'use strict';

  const Command = require('cmnd').Command;
  const { stripIndent } = require('common-tags');
  const users = require('../../../src/users');

  class Users extends Command {

    constructor() {

      super('users');

    }

    help() {

      return {
        description: 'Get user profile',
        args: ['username']
      };

    }

    formatter(user) {
      return (stripIndent`
        👤  ${user.username}
        📖  ${user.bio}
        👾  ${user.counters.games} games owned
        ℹ️  ${user.counters.collections} collections | ${user.counters.reviews} comments
      `);
    }

    run({ args }, callback) {
      users(args[0]).profile()
        .then(profile => callback(null, this.formatter(profile.get())))
        .catch(e => callback(new Error(e.message)))
    }

  }

  return Users;

})();