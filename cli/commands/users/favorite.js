module.exports = (() => {

  'use strict';

  const Command = require('cmnd').Command;
  const { stripIndents } = require('common-tags');
  const users = require('../../../src/users');

  class Users extends Command {

    constructor() {

      super('users', 'favorite');

    }

    help() {

      return {
        description: 'Get user\'s favorite games',
        args: ['username']
      };

    }

    formatter(user, games) {
      return (stripIndents`
        👤  ${user}'s favorite games
        👾  ${games.length} total

        ${games.map(game => ` - ${game.name}`).join('\n')}
      `);
    }

    run({ args }, callback) {
      users(args[0]).favorite()
        .then(favorite => callback(null, this.formatter(args[0], favorite.get())))
        .catch(e => callback(new Error(e.message)))
    }

  }

  return Users;

})();